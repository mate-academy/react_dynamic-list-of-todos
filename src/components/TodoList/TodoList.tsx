import React from 'react';
import classNames from 'classnames';

import { Todo } from '../../types/Todo';
import './TodoList.scss';

type Props = {
  todos: Todo[],
  onUserSelect: (id: number) => void,
  selectedUserId: number
};

export const TodoList: React.FC<Props> = ({ todos, onUserSelect, selectedUserId }) => (
  <div className="TodoList">
    <h2>Todos:</h2>

    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {todos.map(todo => (
          <li
            className={classNames(
              'TodoList__item',
              { 'TodoList__item--unchecked': !todo.completed },
              { 'TodoList__item--checked': todo.completed },
            )}
            key={todo.id}
          >
            <label htmlFor={`${todo.id}`}>
              <input
                type="checkbox"
                id={`${todo.id}`}
                checked={todo.completed}
                readOnly
              />
              <p>{todo.title}</p>
            </label>

            <button
              className={classNames(
                'TodoList__user-button',
                { 'TodoList__user-button--selected': selectedUserId === todo.userId },
                'button',
              )}
              type="button"
              onClick={() => onUserSelect(todo.userId)}
            >
              {`User #${todo.userId}`}
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
