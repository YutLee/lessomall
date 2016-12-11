'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addTodo = addTodo;
/*
 * action 创建函数
 */

function addTodo(text) {
  return { type: 'ADD_TODO', text };
}