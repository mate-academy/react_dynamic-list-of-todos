import React from 'react';
import classNames from 'classnames';
import './TodoList.scss';

interface Props {
  todos: Todo[],
  searchQuery: string,
  todoStatus: string,
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  onSelectUser: (userId: number) => void,
  onRandomize: () => void
}

export const TodoList: React.FC<Props> = ({
  todos,
  searchQuery,
  todoStatus,
  onSearchChange,
  onSelectUser,
  onRandomize,
}) => {
  return (
    <div className="TodoList">
      <form className="form" action="GET">
        <h2 className="form__title">Filter todos</h2>
        <div className="mb-4">
          <label className="form__label" htmlFor="title">
            Search todo
            <br />
            <input
              className="form-control mt-1"
              name="searchQuery"
              type="text"
              placeholder="Type search word"
              value={searchQuery}
              onChange={onSearchChange}
            />
          </label>
        </div>

        <div>
          <select
            className="form-select mb-5"
            name="todoStatus"
            id="todoStatus"
            value={todoStatus}
            onChange={onSearchChange}
          >
            <option value="" disabled>
              Choose a todo status
            </option>

            <option value="all">
              All
            </option>

            <option value="completed">
              Completed
            </option>

            <option value="not completed">
              Not completed
            </option>
          </select>
        </div>
      </form>

      <h2>Todos:</h2>

      <div className="btn-container">
        <button
          className="btn btn-outline-primary TodoList__randomize-btn"
          type="button"
          onClick={onRandomize}
        >
          Randomize
        </button>
      </div>

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {todos.map(({
            id,
            userId,
            title,
            completed,
          }) => {
            return (
              <li
                key={id}
                className={classNames(
                  'TodoList__item',
                  { 'TodoList__item--checked': completed },
                  { 'TodoList__item--unchecked': !completed },
                )}
              >
                <label htmlFor="todo">
                  <input
                    name="todo"
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
                  onClick={() => onSelectUser(userId)}
                >
                  {`User#${userId}`}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
