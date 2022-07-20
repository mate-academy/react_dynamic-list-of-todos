import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../react-app-env';
import './TodoInfo.scss';

type Props = {
  visibleTodos: Todo[],
  handleUserIdChange: (todo: Todo) => void,
};

export const TodoInfo: React.FC<Props> = React.memo(({
  visibleTodos,
  handleUserIdChange,
}) => {
  return (
    <ul data-cy="listOfTodos" className="TodoList__list">
      {visibleTodos?.map(todo => (
        <li
          key={todo.id}
          className={classNames(
            'TodoList__item',
            {
              'TodoList__item--checked': todo.completed,
              'TodoList__item--unchecked': !todo.completed,
            },
          )}
        >
          <label>
            <input
              checked={todo.completed}
              type="checkbox"
              readOnly
            />
            <p>{todo.title}</p>
          </label>

          <button
            data-cy="userButton"
            className="
                  TodoList__user-button
                  TodoList__user-button--selected
                  button
                "
            type="button"
            onClick={() => {
              handleUserIdChange(todo);
            }}
          >
            {`User #${todo.userId}`}
          </button>
        </li>
      ))}
    </ul>
  );
});
