/* eslint-disable jsx-a11y/label-has-associated-control */
import classNames from 'classnames';
import React from 'react';
import './TodoList.scss';

type Props = {
  todos: Todo[];
  selectedUserId: number,
  onUserSelectButton: (userId: number) => void,
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectedUserId,
  onUserSelectButton,
}) => {
  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="TodoList__list-container">
        <ul className="TodoList__list">

          {todos.map(todo => (
            <li
              className={classNames(
                'TodoList__item', {
                  'TodoList__item--checked': todo.completed,
                  'TodoList__item--unchecked': !todo.completed,
                },
              )}
              key={todo.id}
            >
              <label>
                <input
                  type="checkbox"
                  readOnly
                  checked={todo.completed}
                />
                <p>{todo.title}</p>
              </label>

              <button
                className={classNames(
                  'TodoList__user-button',
                  'button', {
                    'TodoList__user-button--selected': todo.userId === selectedUserId,
                  },
                )}
                type="button"
                onClick={() => onUserSelectButton(todo.userId)}
              >
                User&nbsp;#
                {todo.userId}
              </button>
            </li>
          ))}

        </ul>
      </div>
    </div>
  );
};
