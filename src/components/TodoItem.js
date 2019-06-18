    
import React from 'react';
import User from './User';
    
function TodoItem(props) {
  const currentUser = props.users.find(person => person.id === props.item.userId);

  return (       
    <tr key={props.item.id}>
      <td>{props.item.title}</td>
      <td className={props.item.completed ? 'active' : 'still_pending'}>
        {props.item.completed ? 'Active' : 'Still pending'}
      </td>
      <td><User user={currentUser.name}/></td>
    </tr>
  );
}

export default TodoItem;
