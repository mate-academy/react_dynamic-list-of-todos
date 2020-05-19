import React from 'react';

type Props = {
  todo: Todos;
};

const TodoItem: React.FC<Props> = ({ todo }) => {
  const {
    id,
    title,
    completed,
    user,
  } = todo;

  return (
    <li
      className="todo__item"
      key={id}
    >
      <div className="todo__title">
        <span className="todo__info">Title:</span>
        {' '}
        { title}
      </div>
      <div className="todo__status">
        <span className="todo__info">Status:</span>
        {' '}
        {completed ? 'completed' : 'in progress'}
      </div>
      <div className="todo__name">
        <span className="todo__info">Name:</span>
        {' '}
        {user ? user.name : ''}
      </div>
    </li>
  );
};

export default TodoItem;
