import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import './TodoList.scss';

type Props = {
  todos: Todo[],
  selectUser: (arg0: number) => void,
  selectedUserId: number,
};

export const TodoList: React.FC<Props> = ({ todos, selectUser, selectedUserId }) => (
  <div className="TodoList">
    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {todos.map(todo => (
          <li
            key={todo.id}
            className={classNames('TodoList__item', { 'TodoList__item--unchecked': !todo.completed }, { 'TodoList__item--checked': todo.completed })}
          >
            <label htmlFor="#">
              <input
                type="checkbox"
                checked={todo.completed}
                readOnly
              />
              <p>{todo.title}</p>
            </label>

            <button
              className={classNames('TodoList__user-button', 'button', { 'TodoList__user-button--selected': todo.userId === selectedUserId })}
              type="button"
              onClick={() => {
                selectUser(todo.userId);
              }}
            >
              {todo.userId ? `User ${todo.userId}` : 'Not user info'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
