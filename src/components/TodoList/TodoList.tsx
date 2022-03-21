import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';

type Props = {
  todos: Todo[],
  userId: number,
  onUserSelect: (userId: number) => void,
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  handleSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
  selectValue: string,
  query: string,
};

export const TodoList: React.FC<Props> = ({
  todos,
  userId,
  onUserSelect,
  handleChange,
  handleSelectChange,
  selectValue,
  query,
}) => (
  <div className="TodoList">
    <h2>Todos:</h2>
    <label htmlFor="input">
      Filter by Title:
      {' '}
      <input
        type="text"
        name="input"
        id="input"
        value={query}
        onChange={handleChange}
      />
      <select
        name="select"
        id="select"
        value={selectValue}
        onChange={handleSelectChange}
      >
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="not">Not completed</option>
      </select>
    </label>

    {todos.length ? (
      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {todos.map(todo => (
            <li
              key={todo.id}
              className={classNames(
                'TodoList__item',
                {
                  'TodoList__item--checked': todo.completed,
                  'TodoList__item--unchecked': !todo.completed,
                },
              )}
            >
              <label htmlFor={`${todo.id}`}>
                <input
                  id={`${todo.id}`}
                  type="checkbox"
                  readOnly
                  checked={todo.completed}
                />
                <p>{todo.title}</p>
              </label>
              <button
                className={classNames(
                  'TodoList__user-button',
                  'button',
                  { 'TodoList__user-button--selected': todo.userId === userId },
                )}
                type="button"
                onClick={() => onUserSelect(todo.userId)}
              >
                {`User: ${todo.userId}`}
              </button>
            </li>
          ))}
        </ul>
      </div>
    ) : <p>Please wait, loading...</p>}
  </div>
);
