import React from 'react';
import User from './User';

function TodoItem(props) {
  return (
    <tr>
      <td>{props.data.title}</td>
      <td>{props.data.completed.toString()}</td>
      <User name={props.data.user.name}/>
    </tr>
  )
}


export default TodoItem;
