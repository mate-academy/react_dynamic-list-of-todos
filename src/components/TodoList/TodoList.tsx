/* eslint-disable jsx-a11y/label-has-associated-control */
import classNames from 'classnames';
import React from 'react';
import './TodoList.scss';

type Props = {
  setSelectedUserId: (userId: number) => void,
  todos: Todo[],
};

export const TodoList: React.FC<Props> = ({ setSelectedUserId, todos }) => (
  <div className="TodoList">
    <h2>Todos:</h2>

    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {todos.map(todo => (
          <li
            className={classNames({
              TodoList__item: true,
              'TodoList__item--unchecked': !todo.completed,
              'TodoList__item--checked': todo.completed,
            })}
            key={todo.id}
          >
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
              />
              <p>{todo.title}</p>
            </label>

            <button
              className={classNames({
                button: true,
                'TodoList__user-button': true,
                'TodoList__user-button--selected': todo.completed,
              })}
              type="button"
              onClick={() => setSelectedUserId(todo.userId)}
            >
              {`User #${todo.userId}`}
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
