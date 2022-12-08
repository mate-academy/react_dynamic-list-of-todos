import React, { useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  filterGoods: (showGoods: Todo[]) => void,
  todos: Todo[],
};

export const TodoFilter: React.FC<Props> = ({ filterGoods, todos }) => {
  const [query, setQuery] = useState('');
  const [selectedField, setSelectedFieldy] = useState('all');

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectedField}
            onChange={(event) => setSelectedFieldy(event.target.value)}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            filterGoods(todos.filter(todo => todo.title.toLocaleLowerCase()
              .includes(event.target.value.toLocaleLowerCase())));
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
          />
        </span>
      </p>
    </form>
  );
};
