import React, { useState } from 'react';
import './Todo.scss';
import classNames from 'classnames';

type Props = {
  todo: Todo,
  changeUser: (userId: number) => void;
  selectedUserId: number,
};

export const Todo: React.FC<Props> = ({
  todo,
  changeUser,
  selectedUserId,
}) => {
  const [userId, setUserId] = useState(0);

  const clickHandler = () => {
    changeUser(todo.userId);
    setUserId(todo.userId);
  };

  return (
    <li
      key={todo.id}
      className={classNames(
        'Todo-item',
        { 'Todo-item--unchecked': !todo.completed },
        { 'Todo-item--checked': todo.completed },
      )}
    >
      <label>
        <input
          type="checkbox"
          checked={todo.completed}
          name={todo.createdAt}
          readOnly
        />
        <p>{todo.title}</p>
      </label>

      <button
        className={classNames(
          'Todo-item__user-button', 'button',
          {
            'Todo-item__user-button--selected':
            userId === selectedUserId,
          },
          {
            'Todo-item__user-button--selected':
            selectedUserId === 0,
          },
        )}
        type="button"
        onClick={clickHandler}
      >
        {`User #${todo.userId}`}
      </button>
    </li>
  );
};
