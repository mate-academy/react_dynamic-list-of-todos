import React from 'react';
import User from '../User/User';

export default function ToDoListItem({ todo, users }) {
  return (
    <tr>
      <td>{todo.title}</td>
      <User user={users} />
      <td>{todo.completed
        ? (<span><i className="fa fa-check text-success"></i> Done</span>)
        : (<span><i className="fa fa-times text-danger"></i> Not Completed</span>)
          }</td>
    </tr>
  );
}
