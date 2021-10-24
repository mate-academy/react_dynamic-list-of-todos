import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';

interface Props {
  todos: Todo[],
  selectedUserId: number,
  callback: (id: number) => void,
}

export const TodoList: React.FC<Props> = ({ todos, selectedUserId, callback }) => (
  <div className="TodoList">
    <h2>Todos:</h2>

    <div className="TodoList__list-container">

      {todos.map(todo => (
        <ul className="TodoList__list">
          <li
            key={todo.id}
            className={classNames('TodoList__item', {
              'TodoList__item--unchecked': !todo.completed,
              'TodoList__item--checked': todo.completed,
            })}
          >
            <label htmlFor="input">
              <input
                id="input"
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
                { 'TodoList__user-button--selected': todo.userId !== selectedUserId },
              )}
              type="button"
              onClick={() => callback(todo.userId)}
            >
              {`User #${todo.userId}`}
            </button>
          </li>
        </ul>
      ))}
    </div>
  </div>
);
