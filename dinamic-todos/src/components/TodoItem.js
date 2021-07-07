import React from 'react';
import User from './User';
import './TodoItem.css'

function TodoItem(props) {
  const { id, title, completed, user } = props;
  return (
    <tr>
      <td>
        <h3>{id}</h3>
      </td>
      <td className="todos">
        <h3>{title}</h3>
      </td>
      <td>
        <input type="checkbox" defaultChecked={completed} />
      </td>
        <User {...user} />
    </tr>
  );
}

export default TodoItem;
