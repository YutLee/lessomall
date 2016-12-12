import express from 'express';
import path from 'path';
import fs from 'fs';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import index from './routes/index';
import users from './routes/users';

let app = express();

// view engine setup
app.engine('html', function (filePath, options, callback) { // 定义模板引擎
  fs.readFile(filePath, function (err, content) {
    if (err) return callback(new Error(err));

    // 这是一个功能极其简单的模板引擎
    let rendered = content.toString().replace(/{{=([^%>]+)?}}/g, function(s0, s1){
        return options[s1];
    });

    return callback(null, rendered);
  })
});
app.set('views', path.join(__dirname, 'views')); // 指定视图所在的位置
app.set('view engine', 'html'); // 注册模板引擎

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

if(app.get('env') === 'development') {
	let proxy = require('http-proxy-middleware');
	// proxy middleware options
	let options = {
    target: 'http://localhost:9090', // target host
    changeOrigin: true,               // needed for virtual hosted sites
    ws: true,                         // proxy websockets
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
app.use(function(req, res, next) {
  let err = new Error('Not Found');
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

export default app;
