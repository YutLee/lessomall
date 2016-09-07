var express = require('express');
var router = express.Router();
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var App = React.createFactory(require('./home.js'))

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  // res.writeHead(200, {'Content-Type': 'text/html'});
  var props = {
      items: [
        'Item 0',
        'Item 1',
        'Item </script>',
        'Item <!--inject!-->',
      ]
    }
    console.log(App());
    var rh = ReactDOMServer.renderToString(App(props));

  var table = '';//makeTable();
  var html = '<!doctype html>\n\
              <html>\
                <head>\
                    <title>react server render</title>\
                </head>\
                <body><div id="content">' +
                    rh +
                    '</div><script>var APP_PROPS = ' + safeStringify(props) + '</script><script src="/javascripts/pack.js"></script>' +
                '</body>\
              </html>';

  res.end(html);
});

function safeStringify(obj) {
  return JSON.stringify(obj).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--')
}

module.exports = router;
