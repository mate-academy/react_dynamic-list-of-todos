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
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          onChange={onSelectFilter}
          value={selectedFilter}
        >
          <option value={FilterStatus.All}>All</option>
          <option value={FilterStatus.Active}>Active</option>
          <option value={FilterStatus.Completed}>Completed</option>
        </select>
      </span>
    </p>

    <p className="control is-expanded has-icons-left has-icons-right">
      <input
        data-cy="searchInput"
        value={query}
        onChange={onQueryChange}
        type="text"
        className="input"
        placeholder="Search..."
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {query.length > 0 && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={onQueryReset}
          />
        </span>
      )}
    </p>
  </form>
);
