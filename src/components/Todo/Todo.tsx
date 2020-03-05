import React from 'react';

interface Props {
  todo: PreparedTodos;
}

export const Todo: React.FC<Props> = ({ todo }) => {

  return (
    <tr>
      <td>{todo.user.username}</td>
      <td>{todo.title}</td>
      <td>{todo.completed ? 'completed' : 'uncompleted'}</td>
    </tr>
  );
};
