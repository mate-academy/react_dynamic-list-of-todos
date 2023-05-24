/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { TodosFilter } from '../../types/TodosFilter';

interface Props {
  query: string;
  filter: TodosFilter;
  setQuery: (query: string) => void;
  setFilter: (filter: TodosFilter) => void;
}

export const TodoFilter: React.FC<Props> = ({
  query,
  filter,
  setQuery,
  setFilter,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={filter}
          onChange={(e) => setFilter(e.target.value as TodosFilter)}
        >
          <option value={TodosFilter.ALL}>All</option>
          <option value={TodosFilter.ACTIVE}>Active</option>
          <option value={TodosFilter.COMPLETED}>Completed</option>
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
        onChange={(e) => setQuery(e.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {query && (
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
          />
        )}
      </span>
    </p>
  </form>
);
