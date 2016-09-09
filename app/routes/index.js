var express = require('express');
var router = express.Router();
require("node-jsx").install();   //安装"node-jsx"，安装该模块可以使nodejs兼容jsx语法
var React=require("react");
var ReactDOMServer = require('react-dom/server');
// var Com=require('./home.js').Component; //引入react组件
var App=React.createFactory(require('./home.js'));
router.get('/', function(req, res, next) {
  var props = {
      items: [
        'Item 0',
        'Item 1',
        'Item </script>',
        'Item ',
      ]
    }
  console.log(App());
  var rh = ReactDOMServer.renderToString(App(props));
  console.log(rh);
  res.render('test.html', { title: 'Express' , rh: rh, props: safeStringify(props)});
});
function safeStringify(obj) {
  return JSON.stringify(obj).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--')
}
module.exports = router;
