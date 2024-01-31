import React, { useState } from 'react';

const TodoFilter: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  return (
    <form className="field has-addons">
      <div className="control">
        <label htmlFor="statusSelect" className="label">
          Filter by Status:
        </label>
        <span className="select">
          <select
            id="statusSelect"
            data-cy="statusSelect"
            value={statusFilter}
            onChange={handleStatusChange}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </div>

      <div className="control is-expanded has-icons-left has-icons-right">
        <label htmlFor="searchInput" className="label visually-hidden">
          Search:
        </label>
        <input
          id="searchInput"
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {searchQuery && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClearSearch}
            />
          </span>
        )}
      </div>
    </form>
  );
};

export default TodoFilter;
