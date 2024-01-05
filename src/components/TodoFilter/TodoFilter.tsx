import React, { useState } from 'react';

type TodoFilterProps = {
  onFilterChange: (status: string, query: string) => void;
};

export const TodoFilter = ({ onFilterChange }: TodoFilterProps) => {
  const [status, setStatus] = useState('all');
  const [query, setQuery] = useState('');

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;

    setStatus(newStatus);
    onFilterChange(newStatus, query);
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onFilterChange(status, e.target.value);
  };

  const handleClearQuery = () => {
    setQuery('');
    onFilterChange(status, '');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={handleStatusChange}
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
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span
            className="icon is-right"
            style={{ pointerEvents: 'all' }}
            onClick={handleClearQuery}
            onKeyDown={(e) => {
              if (e.key === 'Enter'
            || e.key === ' ') {
                handleClearQuery();
              }
            }}
            role="button"
            tabIndex={0}
            aria-label="Clear Query"
          >

            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              aria-label="Clear Search"
            />
          </span>
        )}
      </p>
    </form>
  );
};

export default TodoFilter;
