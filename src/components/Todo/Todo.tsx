import React from 'react';

interface Props {
  todo: PreparedTodo;
}

export const Todo: React.FC<Props> = ({ todo }) => (
  <tr>
    <td>{todo.user.username}</td>
    <td>{todo.title}</td>
    <td>{todo.completed ? 'completed' : 'uncompleted'}</td>
  </tr>
);
