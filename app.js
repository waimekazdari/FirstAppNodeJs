var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');

var app = express();

//package that can parss body of what ever come in to or request
var bodyParser = require('body-parser');


//3 lignes for Authentification
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: 'node'}));

/*
app.use(passport.initialize());
app.use(passport.session());
*/

require('./config/passport')(app);

var index = require('./routes/index');
var users = require('./routes/users');
var nav = [{
  Link:'/Books',
  Text :'Books'
},{
  Link:'/Authors',
  Text:'Authors'
}];
var bookRouter = require('./routes/bookRoutes')(nav);
var adminRouter = require('./routes/adminRoutes')(nav);
var authRouter = require('./routes/authRoutes')(nav);

app.use('/Books', bookRouter);
app.use('/Admin',adminRouter);
app.use('/Auth',authRouter);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// add handlbars
var handlebars= require('express-handlebars')
app.engine('.hbs',handlebars({extname: '.hbs'}));

// uncomment after placing your favicon in public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', index);
app.get('/',function (req,res) {
  res.render('indexe',{
    title: "hello from render ejs" ,
    nav:[{
      Link:'/books',
      Text:'Books'
  },{
      Link:'/Authors',
      Text:'Authors'
  }]
});
});
app.use('/users', users);

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
