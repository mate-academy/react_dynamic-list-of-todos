import React from 'react';

interface Props {
  filter: string;
  query: string;
  onFilterChange: (status: string) => void;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClearSearch: () => void;
}

export const TodoFilter: React.FC<Props> = ({
  filter,
  query,
  onFilterChange,
  onSearchChange,
  onClearSearch,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            value={filter}
            onChange={e => onFilterChange(e.target.value)}
            data-cy="statusSelect"
            aria-label="Filter tasks by status"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          type="text"
          className="input"
          placeholder="Search..."
          value={query}
          onChange={onSearchChange}
          data-cy="searchInput"
          aria-label="Search for a task"
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              type="button"
              onClick={onClearSearch}
              className="delete"
              data-cy="clearSearchButton"
              aria-label="Clear search input"
            />
          </span>
        )}
      </p>
    </form>
  );
};
