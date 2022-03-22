import React from 'react';
import classNames from 'classnames';

import './TodoList.scss';

type Props = {
  onSelect: (userId: number) => void,
  userId: number,
  todos: Todo[],
};

export const TodoList: React.FC<Props> = ({
  onSelect,
  userId,
  todos,
}) => {
  return (
    <div className="TodoList">
      <h2>Todos:</h2>
      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {
            todos.map(todo => (
              <li
                className={classNames(
                  'TodoList__item',
                  {
                    'TodoList__item--unchecked': !todo.completed,
                    'TodoList__item--checked': todo.completed,
                  },
                )}
                key={todo.id}
              >
                <label htmlFor={`${todo.id}`}>
                  <input
                    id={`${todo.id}`}
                    type="checkbox"
                    readOnly
                    checked={todo.completed}
                  />
                  <p>{todo.title}</p>
                </label>
                <button
                  className={classNames(
                    'TodoList__user-button',
                    'button',
                    { 'TodoList__user-button--selected': todo.userId === userId },
                  )}
                  type="button"
                  onClick={() => onSelect(todo.userId)}
                >
                  {`User #${todo.userId}`}
                </button>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
};
