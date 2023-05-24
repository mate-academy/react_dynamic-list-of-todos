import React from 'react';

import { FilterBy } from '../../types/FilterBy';

const filterByOptions = Object.values(FilterBy);

type Props = {
  query: string;
  onQueryChange: (newQuery: string) => void;
  statusFilter: FilterBy;
  onStatusFilterChange: (newFilterBy: FilterBy) => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  statusFilter,
  onQueryChange,
  onStatusFilterChange,
}) => {
  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onStatusFilterChange(event.currentTarget.value as FilterBy);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.currentTarget.value);
  };

  const handleQueryReset = () => {
    onQueryChange('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={statusFilter}
            onChange={handleFilterChange}
          >
            <option value={filterByOptions[0]}>All</option>
            <option value={filterByOptions[1]}>Active</option>
            <option value={filterByOptions[2]}>Completed</option>
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
          onChange={handleQueryChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              aria-label="Reset"
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleQueryReset}
            />
          </span>
        )}
      </p>
    </form>
  );
};
