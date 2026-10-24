import React, { useState } from 'react';

type Props = {
  onQueryChange: (newValue: string) => void;
  onFilterChange: (newValue: string) => void;
};

export const TodoFilter = React.memo(
  ({ onQueryChange, onFilterChange }: Props) => {
    const [query, setQuery] = useState('');
    const [filter, setFilter] = useState('all');

    const handleStatusChange = (
      event: React.ChangeEvent<HTMLSelectElement>
    ) => {
      const value = event.target.value;

      setFilter(value);
      onFilterChange(value);
    };

    const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;

      setQuery(value);
      onQueryChange(value);
    };

    const handleClearQueryClick = () => {
      setQuery('');
      onQueryChange('');
    };

    return (
      <form className="field has-addons">
        <p className="control">
          <span className="select">
            <select
              data-cy="statusSelect"
              value={filter}
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
            value={query}
            className="input"
            placeholder="Search..."
            onChange={handleQueryChange}
          />
          <span className="icon is-left">
            <i className="fas fa-magnifying-glass" />
          </span>

          {query && (
            <span className="icon is-right" style={{ pointerEvents: 'all' }}>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={handleClearQueryClick}
              />
            </span>
          )}
        </p>
      </form>
    );
  },
);

TodoFilter.displayName = 'TodoFilter';
