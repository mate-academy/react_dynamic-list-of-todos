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
        Title:
        {' '}
        { title}
      </div>
      <div className="todo__title">
        Status:
        {' '}
        {completed ? 'completed' : 'in progress'}
      </div>
      <div className="todo__title">
        Name:
        {' '}
        {user ? user.name : ''}
      </div>
    </li>
  );
};

export default TodoItem;
