var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var dotenv = require('dotenv');

dotenv.config()

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var adminRouter = require('./routes/admin');
var userRouter = require('./routes/user');
var assetRouter = require('./routes/asset');
var app = express();
var DB = "";
const { MONGODB_PW, TOKEN_KEY, npm_config_db} = process.env;
if(npm_config_db == "dev"){
  DB = "devTrustAPP"
}else{
  DB = "trustAPP"
}
// CONNECT TO MONGODB SERVER
const uri = "mongodb+srv://root:"+MONGODB_PW+"@cluster0.7a0ac.mongodb.net/"+DB+"?retryWrites=true&w=majority";
console.log()
mongoose
  .connect(uri,{ dbName: DB, useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Successfully connected to '+ uri))
  .catch(e => console.error(e));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/asset', assetRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  //res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
