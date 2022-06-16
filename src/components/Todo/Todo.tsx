import React, { useState } from 'react';
import './Todo.scss';
import classNames from 'classnames';

type Props = {
  todo: Todo,
  changeUser: (userId: number) => void;
};

export const Todo: React.FC<Props> = ({ todo, changeUser }) => {
  const [checked, setChecked] = useState(false);

  return (
    <li
      key={todo.id}
      className={classNames(
        'Todo-item',
        { 'Todo-item--unchecked': !checked },
        { 'Todo-item--checked': checked },
      )}
    >
      <label>
        <input
          type="checkbox"
          name={todo.createdAt}
          onChange={() => setChecked(!checked)}
          readOnly
        />
        <p>{todo.title}</p>
      </label>

      <button
        className="
          TodoList__user-button
          TodoList__user-button--selected
          button
        "
        type="button"
        onClick={() => changeUser(todo.userId)}
      >
        {`User ${todo.userId}`}
      </button>
    </li>
  );
};
