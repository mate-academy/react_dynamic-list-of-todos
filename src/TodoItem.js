import React from 'react';
import User from "./User.js";

function TodoItem(props) {
  return (
  <tr>
    <td>
    {props.todo.id}
    </td>
    <td>
    {props.todo.title}
    </td>
    <td>
    {props.todo.completed.toString()}
    </td>
  <User user={props.todo.user} />
  </tr>
  );
}

export default TodoItem ;
