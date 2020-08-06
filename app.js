var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var coolRouter = require('./routes/cool');
var catalogRouter = require('./routes/catalog');

var app = express();
//mongodb+srv://admin:admin123@cluster0.inyjd.gcp.mongodb.net/local_library?retryWrites=true&w=majority
// view engine setup
var mongoose = require('mongoose');
var mangoDB = "mongodb+srv://admin:admin123@cluster0.inyjd.gcp.mongodb.net/local_library?retryWrites=true&w=majority";
mongoose.connect(mangoDB,{useNewUrlParser : true});
var db = mongoose.connection;
db.on('error',console.error.bind(console,'MangoDB connection error:'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/users/cool',coolRouter);
app.use('/catalog',catalogRouter);  // Add catalog routes to middleware chain.


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


app.use(logger('dev'));
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
