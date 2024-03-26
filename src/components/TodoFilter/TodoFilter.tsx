// TodoFilter.tsx
import React from 'react';

type Props = {
  filter: string;
  query: string;
  onFilterChange: (newFilter: string) => void;
  onQueryChange: (newQuery: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  filter,
  query,
  onFilterChange,
  onQueryChange,
}) => {
  const handleDropdown = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange(event.currentTarget.value);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.currentTarget.value);
  };

  const handleClearButton = () => {
    onQueryChange('');
    onFilterChange('all');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter}
            onChange={handleDropdown}
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
          onChange={handleQueryChange}
        />
        <span className="icon is-left">
          <i className="fas fa-search" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClearButton}
            />
          )}
        </span>
      </p>
    </form>
  );
};
