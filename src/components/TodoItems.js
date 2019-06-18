import React from 'react';
import User from './Users';


function TodoItems(props) {
  return (
    <tr>
      <td>{props.data.title}</td>
      <User user={props.data.user} />
      <td>{props.data.completed}</td>
    </tr>
    
  )
}

export default TodoItems;