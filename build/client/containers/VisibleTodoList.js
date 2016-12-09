'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = require('react-redux');

var _TodoList = require('../components/TodoList');

var _TodoList2 = _interopRequireDefault(_TodoList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed);
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed);
  }
};

const mapStateToProps = state => {
  return {
    todos: getVisibleTodos(state.todos, 'SHOW_ALL')
  };
};

const VisibleTodoList = (0, _reactRedux.connect)(mapStateToProps)(_TodoList2.default);

exports.default = VisibleTodoList;