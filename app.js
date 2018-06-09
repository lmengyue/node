var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var Cookies = require('cookies');
var bodyParser = require('body-parser');
var swig = require('swig');

var index = require('./routes/index');
var user = require('./routes/user');
var news = require('./routes/news');

var app = express();

// view engine setup
app.engine('html',swig.renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
//在开发过程中，取消模板缓存
swig.setDefaults({cache:false});
//开发完成，可以注释掉，提高性能

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req,res,next){
  req.cookies = new Cookies(req,res);
  req.userInfo={};
  if(req.cookies.get('userInfo')){
    try{
      req.userInfo = JSON.parse(req.cookies.get('userInfo'));
    }catch (e){}
  }else{

  }
  next();
});

app.use('/', index);
app.use('/user', user);
app.use('/news', news);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
