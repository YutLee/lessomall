'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _serveFavicon = require('serve-favicon');

var _serveFavicon2 = _interopRequireDefault(_serveFavicon);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _index = require('./routes/index');

var _index2 = _interopRequireDefault(_index);

var _users = require('./routes/users');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let app = (0, _express2.default)();

// view engine setup
app.engine('html', function (filePath, options, callback) {
  // 定义模板引擎
  _fs2.default.readFile(filePath, function (err, content) {
    if (err) return callback(new Error(err));

    // 这是一个功能极其简单的模板引擎
    let rendered = content.toString().replace(/{{=([^%>]+)?}}/g, function (s0, s1) {
      return options[s1];
    });

    return callback(null, rendered);
  });
});
app.set('views', _path2.default.join(__dirname, 'views')); // 指定视图所在的位置
app.set('view engine', 'html'); // 注册模板引擎

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use((0, _morgan2.default)('dev'));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use((0, _cookieParser2.default)());
app.use('/public', _express2.default.static(_path2.default.join(__dirname, 'public')));

app.use('/', _index2.default);
app.use('/users', _users2.default);

if (app.get('env') === 'development') {
  let proxy = require('http-proxy-middleware');
  // proxy middleware options
  let options = {
    target: 'http://localhost:9090', // target host
    changeOrigin: true, // needed for virtual hosted sites
    ws: true, // proxy websockets
    pathRewrite: {
      // '^/api/old-path' : '/api/new-path',     // rewrite path
      // '^/api/remove/path' : '/path'           // remove base path
      '/javascripts/': '/'
    },
    router: {
      // when request.headers.host == 'dev.localhost:3000',
      // override target 'http://www.example.org' to 'http://localhost:8000'
      // 'dev.localhost:3000' : 'http://localhost:8000'
    }
  };
  app.use('/javascripts/', proxy(options));
}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

exports.default = app;