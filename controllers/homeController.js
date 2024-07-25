const db = require('../config/dbconnection.js');
const { validationResult } = require("express-validator");
var bcrypt = require('bcrypt');

const indexpage = ((req, res) => {
    res.render('index');
});

const registration = ((req, res) => {
    res.render('registration');
});

const registeruser = ((req, res, next) => {
    try {
        const errors = validationResult(req);

        // if there is error then return Error
    if (!errors.isEmpty()) {
        req.flash('feedback', {
            success: false,
            errors: errors.array(),
          });
        return res.redirect('back');
        // return res.status(400).json();
      }
    else {

        const name = req.body.fullname;
        const email= req.body.email;
        var password= req.body.password;
        const role = "Admin";

        if(email){

            db.query('SELECT * FROM users WHERE email = ?', [email], 
            (error, results, fields)=>{

                if (results.length>0){
                    req.flash('feedback', 'E-mail exists.');
                    return res.redirect('back');
                }
                else{
                    var salt = bcrypt.genSaltSync(10);

                    bcrypt.hash(password, salt, (err, hash)=> {
                        if(err)throw err;
                        password = hash;
                        const query = 'INSERT INTO users(name, email, password, role) VALUES(?, ?, ?, ?)';
                        db.query(query, [name, email, password, role]);
                      });
                      
                      req.flash('success', 'Employee registered successful.');
                      return res.redirect('back');
                }
            });
            }
            else{
                req.flash('feedback', 'Please enter your email address.');
                return res.redirect('back');
            };
    }

    } catch (error) {
        // console.log(error);
        req.flash('feedback', {error: error});
        return res.redirect('back');
        next(error);
    }
});

    const login = ((req, res) => {
        try {
            const email = req.body.email;
            const password = req.body.password;
            const role = "Admin";
            var hashedPassword;

            const errors = validationResult(req);

            // if there is error then return Error
            if (!errors.isEmpty()) {
                    req.flash('feedback', {
                    success: false,
                    errors: errors.array(),
                });
                    return res.redirect('back');
            // return res.status(400).json();
                }
          
            else if (email && password) {
                const query = 'SELECT password, role FROM users WHERE email = ?';
        
                db.query(query, [email], (error, result, fields) => {

                            hashedPassword = result[0].password;
                        const hashing = bcrypt.compareSync(password, hashedPassword);
                        const role = result[0].role;

                        if (hashing == true && role == 'Admin') {
                                req.session.isAdmin = true;
                                // res.redirect('/home');

                                res.send("admin Successful login");

                        }
                        else if (hashing == true && role == 'Staff') {
                            req.session.isStaff = true;
                            // res.redirect('/home');

                            res.send("staff Successful login");

                        }
                        else {
                                req.flash('feedback', 'Wrong email or password.');
                                return res.redirect('back');
                    }   
                });
            }
             else {
              res.send('Please enter Username and Password!');
              res.end();
            } 
        } catch (error) {
            console.log(error);
        }
});

module.exports = { 
    indexpage, registration, registeruser, login
};