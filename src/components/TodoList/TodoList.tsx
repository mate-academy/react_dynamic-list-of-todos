import React from 'react';
import './TodoList.scss';

import classNames from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[],
  selectUser: (userId: number) => void,
  searchByTitle: (event: React.ChangeEvent<HTMLInputElement>) => void,
  searchRequest: string,
  status: string,
  handleStatus: (event: React.ChangeEvent<HTMLSelectElement>) => void,
}

export const TodoList: React.FC<Props> = ({
  todos,
  selectUser,
  searchRequest,
  searchByTitle,
  status,
  handleStatus,
}) => (
  <div className="TodoList">
    <h2>Todos:</h2>
    <input
      type="text"
      value={searchRequest}
      placeholder="Search by Title"
      onChange={searchByTitle}
    />
    <select
      value={status}
      onChange={handleStatus}
    >
      <option
        value="all"
      >
        All
      </option>
      <option
        value="active"
      >
        Active
      </option>
      <option
        value="completed"
      >
        Completed
      </option>
    </select>
    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {todos.map(todo => {
          const { title } = todo;

          return (
            <li
              className={classNames('TodoList__item', {
                'TodoList__item--unchecked': !todo.completed,
              })}
              key={todo.id}
            >
              <label htmlFor="form-user-input">
                <input id="form-user-input" type="checkbox" readOnly />
                <p>{title}</p>
              </label>
              <button
                className="
                  TodoList__user-button
                  TodoList__user-button--selected
                  button
                "
                type="button"
                onClick={() => selectUser(todo.userId)}
              >
                User&nbsp;#
                {todo.userId}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  </div>
);
