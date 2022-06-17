import React from 'react';
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
            todo.userId === selectedUserId,
          },
        )}
        type="button"
        onClick={() => changeUser(todo.userId)}
      >
        {`User #${todo.userId}`}
      </button>
    </li>
  );
};
