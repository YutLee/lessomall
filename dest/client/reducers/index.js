'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, {
        text: action.text,
        completed: false
      }];
    default:
      return state;
  }
}

const todoApp = (0, _redux.combineReducers)({
  todos
});

exports.default = todoApp;