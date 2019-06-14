import React from 'react';
import User from './User';
import './TodoItem.css';

function TodoItem(props) {
  return (
    <tr key={props.data.title}>
      <td>{props.data.title}</td>
      <td>{`${props.data.completed}`}</td>
      <User name={props.data.user.name} />
    </tr>
  );
}

export default TodoItem;
