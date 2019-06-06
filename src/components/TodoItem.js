import React from 'react'
import User from './User'

function TodoItem(props) {
  const {todo, user} = props;
  console.log(todo.id)
  return (
    <tr key={todo.id}>
      <td>{todo.title}</td>
      <User user={user} id={todo.userId}/>
      <td>{`${todo.completed}`}</td>
    </tr>
  );
}

export default TodoItem
