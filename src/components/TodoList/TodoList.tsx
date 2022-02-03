import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';

type Props = {
  todos: Todo[],
  selectedUserId: number,
  handleSelectUser: (userId: number) => void,
};

export const TodoList: React.FC<Props> = ({ todos, selectedUserId, handleSelectUser }) => (
  <div className="TodoList">
    <h2>Todos:</h2>

    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {todos.map(todo => (
          <li
            key={todo.id}
            className={
              classNames('TodoList__item', {
                'TodoList__item--checked': todo.completed,
                'TodoList__item--unchecked': !todo.completed,
              })
            }
          >
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
                readOnly
              />
              <p>{todo.title}</p>
            </label>

            <button
              onClick={() => handleSelectUser(todo.userId)}
              className={
                classNames('TodoList__user-button', 'button', {
                  'TodoList__user-button--selected': selectedUserId === todo.userId,
                })
              }
              type="button"
            >
              User #
              {todo.userId}
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
