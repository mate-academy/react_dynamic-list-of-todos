import React from 'react';
import TodoItem from '../TodoItem/TodoItem';
import './TodoList.css';

function TodoList({ dataFromServer }) {
  return (
    <div className="todos-list">
      {dataFromServer.map(item => <TodoItem todo={item} key={item.id} />)}
    </div>
  );
}

export default TodoList;
