import React from 'react';
import { User } from './User';
import { PreparedTodo } from './types';

export const Todo: React.FC< {todo: PreparedTodo} > = ({ todo }) => (
  <tr>
    <td>{todo.completed ? 'Done' : 'In progress'}</td>
    <td>{todo.title}</td>
    <User name={todo.user.name} />
  </tr>
);
