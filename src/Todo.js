import React from 'react';

const Todo = ({ usersAndTodosArr }) => (
  usersAndTodosArr.map(todo => (
    <li key={todo.id}>
      <h2>
        {`Todo: `}
        {todo.title}
      </h2>
      <h3>
        {`Name: `}
        {todo.user.name}
      </h3>
      <h3>
        {`Todo status: `}
        {todo.completed ? 'Done' : 'In prossecc'}
      </h3>
    </li>
  ))
);

export default Todo;
