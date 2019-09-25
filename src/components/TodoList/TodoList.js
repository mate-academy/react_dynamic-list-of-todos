import React from 'react';
import './TodoList.css';
import TodoItem from '../TodoItem/TodoItem';

const TodoList = ({ todos }) => (
  <div className="todos-list">
    { todos.map(todo => (
      <TodoItem key={todo.id} todo={todo} />
    ))}
  </div>
);
  export default TodoList;
