import classNames from 'classnames';
import React from 'react';
import './TodoList.scss';

type Props = {
  todos: Todo[],
  selectedUserId: number,
  selectUserId: (userId: number) => void,
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectedUserId,
  selectUserId,
}) => {
  return (
    <div className="TodoList">
      {todos.length > 0 ? (
        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {todos.map(todo => (
              <li
                key={todo.id}
                className={classNames(
                  'TodoList__item',
                  { 'TodoList__item--unchecked': !todo.completed },
                  { 'TodoList__item--checked': todo.completed },
                )}
              >
                <label>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    readOnly
                  />
                  <p>{todo.title}</p>
                </label>

                <button
                  className={classNames(
                    'TodoList__user-button',
                    'button',
                    {
                      'TodoList__user-button--selected':
                        todo.userId === selectedUserId,
                    },
                  )}
                  type="button"
                  onClick={() => selectUserId(todo.userId)}
                >
                  User&nbsp;#
                  {todo.userId}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="error-message">
          <p>No todos was found</p>
        </div>
      )}
    </div>
  );
};
