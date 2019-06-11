import React from 'react';
import TodoItem from './TodoItem';
import './TodoList.css';

function TodoList(props) {
  const { todoList } = props;

  return (
    <table>
      <thead>
        <tr>
        <th>Todo ID</th>
        <th>Todo</th>
        <th>Completed</th>
        <th>User name</th>
        </tr>
      </thead>
      <tbody>
        {todoList.map(todoEx => (
          <TodoItem key={todoEx.id} {...todoEx} />
        ))}
      </tbody>
    </table>
  );
}

export default TodoList;
