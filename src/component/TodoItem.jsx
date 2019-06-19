import React from 'react';
import './TodoItem.css';

export default function TodoItem(props) {
  return (
    <div className="todo-item">
      <span className="todo-title">{props.title}</span>
      <span>{props.completed ? 'completed' : 'todo'}</span>
      {props.children}
    </div>
  );
}
