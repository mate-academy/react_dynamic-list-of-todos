import React from 'react';

export const TodoItem: React.FC<TodosWithUsers> = ({ user, title, complete }) => {
  const tdClassName = complete ? (
    'completed'
  ) : (
    'in-progress'
  );

  return (
    <tr>
      <td>{title}</td>
      <td>{user}</td>
      <td className={tdClassName}>
        {complete ? 'Completed' : 'In progress' }
      </td>
    </tr>
  );
};
