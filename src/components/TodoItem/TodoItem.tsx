import React, { useState } from 'react';
import classnames from 'classnames';

interface Props {
  todo: Todo,
  selectUser: ((id: number) => void),
}

export const TodoItem: React.FC<Props> = ({
  todo,
  selectUser,
}) => {
  const [completed, setCompleted] = useState(false);

  const changeComplete = () => {
    setCompleted((prev) => !prev);
  };

  return (
    <li className={classnames(
      'TodoList__item',
      { 'TodoList__item--checked': completed || todo.completed },
    )}
    >
      <label>
        <input
          type="checkbox"
          onChange={changeComplete}
          readOnly
        />
        <p>{todo.title}</p>
      </label>
      {todo.userId && (
        <button
          className="
            TodoList__user-button
            TodoList__user-button--selected
            button
          "
          type="button"
          onClick={() => selectUser(todo.userId)}
        >
          User&nbsp;
          {todo.userId}
        </button>
      )}
    </li>
  );
};
