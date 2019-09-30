import React from 'react';
import './TodoItem.css';
import User from '../User/User';

function TodoItem(props) {
  const { todo } = props;
  return (
    <div className="todo-item">
      <span className="item--title">Title: </span>
      {todo.title}
      <br />
      <span className="item--title">Status: </span>
      {todo.completed ? 'Done' : 'In progress'}
      <hr />
      <User name={todo.user.name} />
    </div>
  );
}

export default TodoItem;
