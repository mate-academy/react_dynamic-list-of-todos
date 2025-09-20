import React from 'react';
import { Type } from '../../types/Filter';

interface FilterProps {
  filter: Type;
  onFilterChange: (filter: Type) => void;
  query: string;
  onQueryChange: (query: string) => void;
}

export const TodoFilter: React.FC<FilterProps> = ({
  filter,
  onFilterChange,
  query,
  onQueryChange,
}) => {
  const handleFilterChange = (type: Type) => {
    onFilterChange?.(type);
  };

  const handleQueryChange = (value: string) => {
    onQueryChange?.(value);
  };

  const handleClearQuery = () => {
    onQueryChange?.('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter}
            onChange={event => handleFilterChange(event.target.value as Type)}
          >
            <option value={Type.All}>All</option>
            <option value={Type.Active}>Active</option>
            <option value={Type.Completed}>Completed</option>
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
          onChange={e => handleQueryChange(e.target.value)}
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
              onClick={handleClearQuery}
            />
          </span>
        )}
      </p>
    </form>
  );
};
