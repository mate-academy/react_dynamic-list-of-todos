import React from 'react';
import { FilterStatus } from '../../types/FilterStatus';

type Props = {
  query: string;
  setQuery: (query: string) => void;
  status: FilterStatus;
  setStatus: (status: FilterStatus) => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  setQuery,
  status,
  setStatus,
}) => {
  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newQuery = event.target.value;

    setQuery(newQuery);
  }

  function handleFilterChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setStatus(event.target.value as FilterStatus);
  }

  function clearInput() {
    setQuery('');
  }

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={handleFilterChange}
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
          value={query}
          className="input"
          placeholder="Search..."
          onChange={handleTitleChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {query.length > 0 && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={clearInput}
            />
          )}
        </span>
      </p>
    </form>
  );
};
