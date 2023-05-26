import React, { ChangeEvent, useState } from 'react';

type TodoFilterProps = {
  onFilterChange: (filter: string, query: string) => void;
};

export const TodoFilter: React.FC<TodoFilterProps> = ({ onFilterChange }) => {
  const [query, setQuery] = useState<string>('');

  const handleFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedFilter = event.target.value;

    onFilterChange(selectedFilter, query);
  };

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;

    setQuery(newQuery);
    onFilterChange('all', newQuery);
  };

  const handleClearQuery = () => {
    setQuery('');
    onFilterChange('all', '');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            onChange={handleFilterChange}
            data-cy="statusSelect"
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
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              onClick={handleClearQuery}
            />
          </span>
        )}
      </p>
    </form>
  );
};
