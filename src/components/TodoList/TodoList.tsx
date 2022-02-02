/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';

type Props = {
  todos: Todo[],
  selectedUserId: number,
  onCheck: (todoId: number) => void,
  onSelectUser: (userId: number) => void,
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectedUserId,
  onCheck,
  onSelectUser,
}) => (
  <div className="TodoList">
    <h2>Todos:</h2>

    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {todos.map(todo => (
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
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onCheck(todo.id)}
              />
              <p>{todo.title}</p>
            </label>

            <button
              className={classNames(
                'button',
                'TodoList__user-button',
                { 'TodoList__user-button--selected': selectedUserId === 0 || todo.userId === selectedUserId },
              )}
              type="button"
              onClick={() => onSelectUser(todo.userId)}
            >
              {`User #${todo.userId}`}
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
