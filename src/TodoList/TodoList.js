import React from 'react';
import TodoItem from '../TodoItem/TodoItem';

const TodoList = ({ todos }) => (
  todos.map(todo => (
    <ul key={todo.id} className="list-group">
      <TodoItem todo={todo} key={todo.id} />
    </ul>
  ))
);
export default TodoList;
