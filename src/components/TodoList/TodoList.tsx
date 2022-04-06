/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../types';
import './TodoList.scss';

export const TodoList = React.memo<Props>(
  ({
    todos,
    selectUser,
    selectedUser,
    changeQuery,
    changeSelectedStatus,
    randomizeTodos,
  }) => {
    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <div className="TodoList__control">
          <input
            className="TodoList__search"
            type="text"
            placeholder="search"
            onChange={event => {
              changeQuery(event.target.value);
            }}
          />
          <select className="TodoList__select" onChange={changeSelectedStatus}>
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
          <button
            type="button"
            className="button"
            onClick={randomizeTodos}
          >
            Randomize
          </button>
        </div>
        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {todos.map(({
              id,
              title,
              completed,
              userId,
            }) => (
              <li
                key={id}
                className={classNames('TodoList__item', {
                  'TodoList__item--checked': completed,
                  'TodoList__item--unchecked': !completed,
                })}
              >
                <label>
                  <input type="checkbox" checked={completed} readOnly />
                  <p>{title}</p>
                </label>

                <button
                  className={classNames('TodoList__user-button', 'button', {
                    'TodoList__user-button--selected': userId === selectedUser,
                  })}
                  type="button"
                  onClick={() => {
                    selectUser(userId);
                  }}
                >
                  User&nbsp;
                  {userId}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  },

);

interface Props {
  todos: Todo[],
  selectUser: (userId: number) => void,
  selectedUser: number,
  changeQuery: (...args: any[]) => void,
  changeSelectedStatus: (event: React.ChangeEvent<HTMLSelectElement>) => void,
  randomizeTodos: () => void,
}
