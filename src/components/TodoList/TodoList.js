import React from 'react';
import TodoItem from '../TodoItem/TodoItem';
import './todolist.css';

function TodoList({serverData}) {
  return (
    <div className="todo_list">
      {serverData.map(item =>
        <TodoItem todo={item} key={item.id} />)}
    </div>
  );
}

export default TodoList;
