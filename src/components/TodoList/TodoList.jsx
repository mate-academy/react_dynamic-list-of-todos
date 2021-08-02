import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';

export const TodoList = ({ todos, selectedUser, setSelectedUser }) => (
  <div className="TodoList">
    <h2>Todos:</h2>

    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {todos.map(todo => (
          <li
            key={todo.id}
            className={classNames('TodoList__item', {
              'TodoList__item--unchecked': !todo.completed,
              'TodoList__item--checked': todo.completed,
            })}
          >
            <label>
              <input type="checkbox" readOnly checked={todo.completed} />
              <p>{todo.title}</p>
            </label>

            <button
              className={classNames(
                'TodoList__user-button',
                'button',
                { 'TodoList__user-button--selected':
                  selectedUser !== todo.userId },
              )}
              type="button"
              onClick={() => setSelectedUser(todo.userId)}
            >
              {`User #${todo.userId}`}
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
