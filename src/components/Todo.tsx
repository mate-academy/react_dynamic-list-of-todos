import React from 'react';

export const Todo: React.FC<PreparedTodo> = ({
  title,
  completed,
  user,
}) => {
  return (
    <tr className="table-info">
      <td>{title}</td>
      <td>{completed ? 'OK' : 'KO'}</td>
      <td>
        {user && (<p>{user.name}</p>)}
      </td>
    </tr>
  );
};
