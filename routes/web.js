const express = require("express");
const router = express.Router();
const homeController = require('../controllers/homeController');
const logoutController = require('../controllers/logoutController');
const { userRegistrationValidate, userLoginValidate } = require("../validations/allvalidations");
const checkRoute = require('../middlewares/adminSessionMiddleware');

let routes = app => {

    router.get('/', homeController.indexpage);
    router.get('/register', homeController.registration);
    router.post('/register/user', userRegistrationValidate, homeController.registeruser);
    router.post('/login/auth', userLoginValidate, homeController.login);

    router.get('/logout', logoutController.logout);

    return app.use("/", router);

};

module.exports = routes;