/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import './TodoList.scss';

import classNames from 'classnames';

interface Props {
  titleToSearch: string,
  completeStatus: string,
  todos: Todo[],
  selectUser: (userId: number) => void,
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLSelectElement>) => void
}

export const TodoList: React.FC<Props> = ({
  titleToSearch,
  completeStatus,
  todos,
  selectUser,
  handleInputChange,
}) => (
  <div className="TodoList">
    <div className="TodosSearch">
      <label
        htmlFor="title"
        className="TodosSearch__label"
      >
        Title:
        <input
          type="text"
          id="title"
          name="titleToSearch"
          value={titleToSearch}
          onChange={handleInputChange}
          placeholder="Task title"
        />
      </label>

      <label
        htmlFor="title"
        className="TodosSearch__label"
      >
        Status:
        <select
          name="completeStatus"
          id="userId"
          value={completeStatus}
          onChange={handleInputChange}
        >
          <option value="">
            Choose status
          </option>

          <option value="not completed">
            Not completed
          </option>

          <option value="completed">
            Completed
          </option>
        </select>
      </label>
    </div>

    <h2>Todos:</h2>

    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {todos.map(todo => {
          const {
            title, completed, id, userId,
          } = todo;

          return (
            <li
              className={classNames(
                'TodoList__item',
                { 'TodoList__item--checked': completed },
                { 'TodoList__item--unchecked': !completed },
              )}
              key={id}
            >
              <label>
                <input
                  type="checkbox"
                  checked={completed}
                  readOnly
                />
                <p>{title}</p>
              </label>

              <button
                className="
                  TodoList__user-button
                  TodoList__user-button--selected
                  button
                "
                type="button"
                onClick={() => selectUser(userId)}
              >
                {`User ${userId}`}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  </div>
);
