import React from 'react';
import classNames from 'classnames';
import './TodoList.scss';

type Props = {
  todos: Todo[];
  selectedUserId: (id: number) => void;
  filter: (event: React.ChangeEvent<HTMLInputElement>) => void;
  query: string;
  filterStatus: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  selectorStatus: number;
  random: () => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectedUserId,
  filter,
  query,
  selectorStatus,
  filterStatus,
  random,
}) => (

  <div className="TodoList">
    <input
      type="text"
      id="search-query"
      className="input"
      placeholder="Type search word"
      value={query}
      onChange={filter}
    />

    <select
      value={selectorStatus}
      onChange={filterStatus}
    >
      <option value="0">all</option>
      <option value="1">active</option>
      <option value="2">completed</option>
    </select>

    <button
      type="button"
      onClick={random}
    >
      Randomize
    </button>

    <h2>Todos:</h2>

    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {todos.map(todo => (
          <li key={todo.id} className={classNames('TodoList__item', { 'TodoList__item--unchecked': !todo.completed }, { 'TodoList__item--checked': todo.completed })}>
            <label htmlFor="label">
              <input
                type="checkbox"
                checked={todo.completed}
                readOnly
              />
              <p>{todo.title}</p>
            </label>

            <button
              className="
                TodoList__user-button
                TodoList__user-button--selected
                button
              "
              type="button"
              onClick={() => selectedUserId(todo.userId)}
            >
              {todo.userId}
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
