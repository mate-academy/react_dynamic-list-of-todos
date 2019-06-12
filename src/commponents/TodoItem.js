import React from 'react';
import User from './User';

function TodoItem(props) {


  const person = props.users.find(item => props.id === item.id);
    return (
      <tr>
        <td>{props.title}</td>
        <User name={person.name} email={person.email}/>
        <td className={props.completed ? 'completed' : 'active'}>{props.completed ? 'completed' : 'active'}</td>

      </tr>
    );

}

export default TodoItem;
