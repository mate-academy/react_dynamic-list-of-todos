import React from 'react';
import { Filter } from '../../types/Filter';

type Props = {
  query: string,
  filter: Filter;
  setFilter: (type: Filter) => void;
  setQuery: (type: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  filter,
  setFilter,
  setQuery,
}) => {
  function handleFilterChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setFilter(event.target.value as Filter);
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
  }

  function handleCloseSearch() {
    setQuery('');
  }

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter}
            onChange={handleFilterChange}
          >
            <option value={Filter.ALL}>All</option>
            <option value={Filter.ACTIVE}>Active</option>
            <option value={Filter.COMPLETED}>Completed</option>
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
          onChange={handleInputChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span
            className="icon is-right"
            style={{ pointerEvents: 'all' }}
          >
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleCloseSearch}
            />
          </span>
        )}
      </p>
    </form>
  );
};
