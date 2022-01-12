/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import classNames from 'classnames';

type Props = {
  todo: Todo;
  selectUser: (id: number | null) => void;
  userId: number | null;
  completeToggle: (todo: Todo) => void;
};

export const TodoItem: React.FC<Props> = (
  {
    todo,
    selectUser,
    userId,
    completeToggle,
  },
) => (
  <li
    className={
      classNames('TodoList__item',
        { 'TodoList__item--unchecked': !todo.completed })
    }
    key={todo.id}
  >
    <label>
      <input
        type="checkbox"
        readOnly
        checked={todo.completed}
        onClick={() => completeToggle(todo)}
      />
      <p>{todo.title}</p>
    </label>

    {todo.userId && (
      <button
        className={
          classNames('TodoList__user-button', 'button',
            { 'TodoList__user-button--selected': todo.userId === userId })
        }
        onClick={() => selectUser(todo.userId)}
        type="button"
      >
        {todo.userId}
      </button>
    )}
  </li>
);
