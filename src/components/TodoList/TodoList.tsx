import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';

type Props = {
  todos: Todo[],
  selectedUserId: number,
  selectUser:(selectedUserId: number) => void
};

export const TodoList: React.FC<Props> = ({ todos, selectedUserId, selectUser }) => (

  <div className="TodoList">
    <h2>Todos:</h2>

    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {todos.map(todo => (
          <li
            key={todo.id}
            className={classNames(
              'TodoList__item',
              { 'TodoList__item--checked': todo.completed },
              { 'TodoList__item--unchecked': !todo.completed },
            )}
          >
            <label htmlFor="checkbox">
              <input
                id="checkbox"
                type="checkbox"
                checked={todo.completed}
                readOnly
              />
              <p>{todo.title}</p>
            </label>

            <button
              className={classNames(
                'TodoList__user-button', 'button',
                { 'TodoList__user-button--selected': todo.userId === selectedUserId },
              )}
              type="button"
              onClick={() => {
                selectUser(todo.userId);
              }}
            >
              User
              #
              {todo.userId}
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
