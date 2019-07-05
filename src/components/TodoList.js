import React from 'react';
import User from './User';
import TodoItem from './TodoItem';

const TodoList = ({ todoWidthUser }) => (
  <div>
    {todoWidthUser.map(item => (
      <div className="todo-list">
        <User userItem={item.user} />
        <TodoItem todoItem={item} />
      </div>
    ))}
  </div>
);

export default TodoList;
