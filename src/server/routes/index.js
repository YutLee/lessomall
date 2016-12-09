'use strict';

import React from 'react'
import { renderToString } from 'react-dom/server'
import { createStore } from 'redux'

import { Provider } from 'react-redux'
import todoApp from '../../client/reducers'
import App from '../../client/components/App'

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	// 创建新的 Redux store 实例
	const store = createStore(todoApp);
	// 把组件渲染成字符串
	const initialState = store.getState();
	// 把组件渲染成字符串
  const app = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  );

  let html = `<!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="root">${app}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>
        <script src="/javascripts/common.js"></script>
        <script src="/javascripts/index.js"></script>
      </body>
    </html>`;

  res.send(html);
});

module.exports = router;
