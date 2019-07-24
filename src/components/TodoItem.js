import React from 'react';
import User from './User';

const TodoItem = ({ todo }) => (
  <tr>
    <td>{todo.id}</td>
    <td>{todo.completed ? '+' : '-' }</td>
    <td>{todo.title}</td>
    <User todo={todo} key={todo.id} />
  </tr>
);

export default TodoItem
