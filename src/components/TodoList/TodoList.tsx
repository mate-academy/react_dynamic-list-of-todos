/* eslint-disable jsx-a11y/label-has-associated-control */
import classNames from 'classnames';
import React from 'react';
import './TodoList.scss';

type Props = {
  todos: Todo[];
  selectedUserId: number;
  selectUser: (userId: number) => void;
  handleTodoFilter: (event: React.ChangeEvent<HTMLInputElement>) => void;
  filterInputValue: string;
  filterBy: string;
  handleSelectFilter: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectedUserId,
  selectUser,
  handleTodoFilter,
  filterInputValue,
  filterBy,
  handleSelectFilter,
}) => (
  <div className="TodoList">
    <h2>Todos:</h2>
    <div className="field">
      <label className="label">Filter by title</label>
      <div className="control">
        <input
          className="input"
          type="text"
          placeholder="Text input"
          value={filterInputValue}
          onChange={handleTodoFilter}
        />
      </div>
    </div>

    <div className="select">
      <select
        value={filterBy}
        onChange={handleSelectFilter}
      >
        <option value="">Choose filter</option>
        <option value="all">All</option>
        <option value="not completed">Not completed</option>
        <option value="completed">Completed</option>
      </select>
    </div>

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
            <input
              type="checkbox"
              readOnly
              checked={todo.completed}
            />
            <p>{todo.title}</p>

            <button
              className={classNames(
                'TodoList__user-button',
                'button',
                { 'TodoList__user-button--selected': selectedUserId === todo.userId },
              )}
              type="button"
              onClick={() => selectedUserId !== todo.userId && selectUser(todo.userId)}
            >
              {`User #${todo.userId}`}
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
