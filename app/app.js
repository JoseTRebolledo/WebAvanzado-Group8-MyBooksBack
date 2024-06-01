var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');



let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let booksRouter = require("./routes/books");
let recomendationRouter = require("./routes/recomendation");
let listElementRouter = require("./routes/listElement");

var app = express();

const orm = require('./models');

app.locals.orm = orm;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/books", booksRouter);
app.use("/recomendations", recomendationRouter);
app.use("/listElements", listElementRouter);

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
