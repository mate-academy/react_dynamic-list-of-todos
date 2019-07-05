import React from 'react';

const TodoItem = ({ todoItem }) => (
  <div className="todo-item">
    <p className="todo-item__title">{todoItem.title}</p>
    <input className="todo-item__check" type="checkbox" checked={todoItem.completed} />
  </div>
);

export default TodoItem;
