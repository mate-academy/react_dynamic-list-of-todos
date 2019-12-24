/* eslint-disable react/jsx-curly-brace-presence */
import React from 'react';

const Todo = ({ todos }) => (
  todos.map(todo => (
    <li key={todo.id} className="listTodos__todo" type="none">
      <h2>
        <span className="listTodos__todo__label">
          {`Todo: `}
        </span>
        {todo.title}
      </h2>
      <h3>
        <span className="listTodos__todo__label">
          {`Name: `}
        </span>
        {todo.user.name}
      </h3>
      <h3>
        <span className="listTodos__todo__label">
          {`Todo completed: `}
        </span>
        {todo.completed ? '✅' : '❌'}
      </h3>
    </li>
  ))
);

export default Todo;
