import React from 'react';

export enum FilterState {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

type Props = {
  filterValue: FilterState;
  onFilterChange: (newValue: FilterState) => void;
  searchQuery: string;
  onSearchChange: (newQuery: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  filterValue,
  onFilterChange,
  searchQuery,
  onSearchChange,
}) => {
  function handleFilterChanged(newFilterValue: FilterState) {
    onFilterChange(newFilterValue);
  }

  function handleSearchChanged(newQuery: string) {
    onSearchChange(newQuery);
  }

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterValue}
            onChange={event =>
              handleFilterChanged(event.target.value as FilterState)
            }
          >
            <option value={FilterState.All}>All</option>
            <option value={FilterState.Active}>Active</option>
            <option value={FilterState.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={searchQuery}
          onChange={event => handleSearchChanged(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {searchQuery && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => handleSearchChanged('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
