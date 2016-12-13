'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _baseRender = require('../baseRender');

var _baseRender2 = _interopRequireDefault(_baseRender);

var _reducers = require('../../client/reducers');

var _reducers2 = _interopRequireDefault(_reducers);

var _App = require('../../client/components/App');

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express2.default.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  const { initialState, html } = (0, _baseRender2.default)(_reducers2.default, _App2.default);
  console.log(html);
  res.render('index', { title: 'index', html: html, initialState: JSON.stringify(initialState) });
});

exports.default = router;