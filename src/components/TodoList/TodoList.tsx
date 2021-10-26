/* eslint-disable jsx-a11y/label-has-associated-control */

import React from 'react';
import classNames from 'classnames';

import './TodoList.scss';

type Props = {
  todos: Todo[],
  selectedUserId: number,
  selectUser: (id: number) => void,
  filterByTitle: (x: string) => void,
  showOnly: (x: string) => void,
};

export const TodoList: React.FC<Props> = ({
  todos, selectedUserId, selectUser, filterByTitle, showOnly,
}) => (
  <div className="TodoList">
    <h2>Todos:</h2>
    <input
      className="TodoList__input"
      type="text"
      placeholder="Search"
      onChange={(event) => {
        filterByTitle(event.target.value);
      }}
    />
    <select
      className="TodoList__select"
      onChange={(event) => showOnly(event.target.value)}
    >
      <option value="all">
        all
      </option>
      <option value="active">
        active
      </option>
      <option value="completed">
        completed
      </option>
    </select>
    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {todos.map(todo => (
          <li
            key={todo.id}
            className={classNames('TodoList__item',
              {
                'TodoList__item--unchecked': !todo.completed,
                'TodoList__item--checked': todo.completed,
              })}
          >
            <label>
              <input type="checkbox" checked={todo.completed} readOnly />
              <p>{todo.title}</p>
            </label>
            <button
              className={classNames('TodoList__user-button',
                { 'TodoList__user-button--selected': todo.userId === selectedUserId },
                'button')}
              type="button"
              onClick={() => selectUser(todo.userId)}
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
