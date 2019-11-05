import React from 'react';
import User from './User';

const TodoItem = ({ title, user, completed }) => (
  <tr>
    <td>{title}</td>
    <User data={user} />
    <td>{completed ? (<span>&#128077;</span>)
      : (<span>&#9940;</span>)}</td>
  </tr>
);

export default TodoItem;
