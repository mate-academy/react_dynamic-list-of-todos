import React from 'react';

function TodoItem({todo}) {
  const {title, completed, user: { name }} = todo;
  const tdClassName = completed ? (
      'positive'
    ) : (
      'negative'
    );

  const completedIcon = completed ? (
    <i className="icon checkmark"></i>
  ) : (
    <i className="icon close"></i>
  );

  return (
    <tr>
      <td>{title}</td>
      <td>{name}</td>
      <td className= {tdClassName}>{completedIcon}{completed.toString()}</td>
    </tr>
  )
}

export default TodoItem;
