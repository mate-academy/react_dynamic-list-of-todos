import React from 'react';
import classNames from 'classnames';

import './TodoList.scss';

type Props = {
  todos: Todo[];
  selectedUserId: (id: number) => void;
  handleButtonFilter: (event: React.ChangeEvent<HTMLInputElement>) => void;
  query: string;
  handleSelectorStatus: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  selectorStatus: number;
  randomizer: () => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectedUserId,
  handleButtonFilter,
  query,
  selectorStatus,
  handleSelectorStatus,
  randomizer,
}) => (

  <div className="TodoList">
    <input
      type="text"
      id="search-query"
      className="input"
      placeholder="Type search word"
      value={query}
      onChange={handleButtonFilter}
    />

    <select
      value={selectorStatus}
      onChange={handleSelectorStatus}
    >
      <option value="0">all</option>
      <option value="1">active</option>
      <option value="2">completed</option>
    </select>

    <button
      type="button"
      onClick={randomizer}
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
