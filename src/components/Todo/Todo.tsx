import React from 'react';

interface Props {
  todo: Todo;
}

const Todo: React.FC<Props> = ({ todo }) => {
  return (
    <li className="app__item">
      <h1 className="app__item-header">{todo.title}</h1>
      <p className="app__item-text">
        {todo.completed ? 'completed' : 'uncompleted'}
      </p>
      <p className="app__item-name">{todo.user ? todo.user.name : 'none'}</p>
    </li>
  );
};

export default Todo;
