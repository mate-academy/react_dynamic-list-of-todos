import React from 'react';
import User from './User';

const TodoItem = ({ title, user, completed }) => (
  <tr>
    <td>{title}</td>
    <User data={user} />
    <td>{completed ? 'Completed' : 'In progress'}</td>
  </tr>
);

export default TodoItem;
