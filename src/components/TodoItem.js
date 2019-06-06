import React from 'react'
import User from './User'

function TodoItem(props) {
  const {todo, user} = props;
  return (
    <tr>
      <td>{props.todo.title}</td>
      <User user={props.user} id={props.todo.userId}/>
      <td>{`${props.todo.completed}`}</td>
    </tr>
  );
}

export default TodoItem
