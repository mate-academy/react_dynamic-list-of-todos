import React from 'react';
import User from '../User/User';
import './todoitem.css';

function TodoItem({todo}) {
  return (
    <div className={todo.completed ? 'item-block item_completed' : 'item-block item_not_completed'}>
      <h1>{todo.title}</h1>
      <p>{todo.completed ? 'Completed' : 'Not completed'}</p>
      <User user={todo.user} />
    </div>
  );
}
export default TodoItem;
