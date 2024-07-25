var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
var flash = require('connect-flash');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//include environement variable configurations.
require('dotenv').config();

//Database connection
const db = require('./config/dbconnection.js');
//end db connection

//  configure session to use it in application
app.use(session({
	secret: 'process.env.SESSION_SECRET',
	resave: true,
	saveUninitialized: true,
}));

//flash message middleware configurations
app.use(flash());
app.use(function(req, res, next){
  res.locals.message = req.flash();
  next();
});

// csrf middleware configurations
var csrf = require('csurf');

app.use(csrf()); //csrf created here and stored to cookie

app.use(function (req, res, next) {
  res.cookie('XSRF-TOKEN', req.csrfToken()); //verify csrf-token here
  res.locals.csrftoken = req.csrfToken();
  next();
});
 
//web and api routes configuration
const initRoutes = require("./routes/web");
initRoutes(app);

//end routes configurations

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
