import React, { useState } from 'react';

interface TodoFilterProps {
  onFilterChange: (filter: string) => void;
  onSearchChange: (search: string) => void;
}

export const TodoFilter: React.FC<TodoFilterProps> = ({
  onFilterChange,
  onSearchChange,
}) => {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
    onFilterChange(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    onSearchChange(event.target.value);
  };

  const handleClearSearch = () => {
    setSearch('');
    onSearchChange('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter}
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
          className="input"
          placeholder="Search..."
          value={search}
          onChange={handleSearchChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {search && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              aria-label="Clear search"
              value={search}
              onClick={handleClearSearch}
            />
          )}
        </span>
      </p>
    </form>
  );
};
