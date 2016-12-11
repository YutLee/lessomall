'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _reducers = require('./client/reducers');

var _reducers2 = _interopRequireDefault(_reducers);

var _App = require('./client/components/App');

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

render(_react2.default.createElement(
  _reactRedux.Provider,
  { store: store },
  _react2.default.createElement(_App2.default, null)
), document.getElementById('root'));

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  // 创建新的 Redux store 实例
  const store = (0, _redux.createStore)(_reducers2.default);
  // 把组件渲染成字符串
  const initialState = store.getState();
  // 把组件渲染成字符串
  const app = (0, _server.renderToString)(_react2.default.createElement(
    _reactRedux.Provider,
    { store: store },
    _react2.default.createElement(_App2.default, null)
  ));

  let html = `<!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="root">${ app }</div>
        <script>
          window.__INITIAL_STATE__ = ${ JSON.stringify(initialState) }
        </script>
        <script src="/javascripts/common.js"></script>
        <script src="/javascripts/index.js"></script>
      </body>
    </html>`;

  res.send(html);
});

module.exports = router;