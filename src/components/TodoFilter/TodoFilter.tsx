import React from 'react';
import { FilterStatus } from '../../types/FilterStatus';

interface TodoFilterProps {
  query: string;
  onQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onQueryReset: () => void;
  selectedFilter: string;
  onSelectFilter: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const TodoFilter: React.FC<TodoFilterProps> = ({
  query,
  onQueryChange,
  onQueryReset,
  selectedFilter,
  onSelectFilter,
}) => {
  const showClearButton = query.length > 0;

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select is-fullwidth">
          <select
            value={selectedFilter}
            onChange={onSelectFilter}
            data-cy="statusSelect"
          >
            <option value={FilterStatus.All}>All</option>
            <option value={FilterStatus.Active}>Active</option>
            <option value={FilterStatus.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          type="text"
          value={query}
          onChange={onQueryChange}
          className="input"
          placeholder="Search..."
          data-cy="searchInput"
        />

        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {showClearButton && (
          <span className="icon is-right" style={{ pointerEvents: 'auto' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              onClick={onQueryReset}
              data-cy="clearSearchButton"
            />
          </span>
        )}
      </p>
    </form>
  );
};
