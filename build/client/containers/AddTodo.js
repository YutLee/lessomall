'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _actions = require('../actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let AddTodo = ({ dispatch }) => {
  let input;

  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'form',
      { onSubmit: e => {
          e.preventDefault();
          console.log(input.value);
          if (!input.value.trim()) {
            return;
          }
          dispatch((0, _actions.addTodo)(input.value));
          input.value = '';
        } },
      _react2.default.createElement('input', { ref: node => {
          input = node;
        } }),
      _react2.default.createElement(
        'button',
        { type: 'submit' },
        'Add Todo'
      )
    )
  );
};
AddTodo = (0, _reactRedux.connect)()(AddTodo);

exports.default = AddTodo;