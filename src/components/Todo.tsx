import React from 'react';

export const Todo: React.FC<PreparedTodo> = ({
  id,
  title,
  completed,
  user,
}) => {
  return (
    <tr>
      <td>{id}</td>
      <td>{title}</td>
      <td>{completed ? 'OK' : 'KO'}</td>
      <td>
        {user && (<p>{user.name}</p>)}
      </td>
    </tr>
  );
};
