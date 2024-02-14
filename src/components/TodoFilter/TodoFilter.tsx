import React from 'react';
import { FilterType } from '../../types/Filter';

interface Props {
  filter: string;
  onFilterChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClearSearch: () => void;
}

export const TodoFilter: React.FC <Props> = ({
  filter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  onClearSearch,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={filter}
          onChange={onFilterChange}
        >
          <option value={FilterType.ALL}>All</option>
          <option value={FilterType.ACTIVE}>Active</option>
          <option value={FilterType.COMPLETED}>Completed</option>
        </select>
      </span>
    </p>

    <p className="control is-expanded has-icons-left has-icons-right">
      <input
        data-cy="searchInput"
        type="text"
        className="input"
        placeholder="Search..."
        value={searchQuery}
        onChange={onSearchChange}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {searchQuery && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          <button
            data-cy="clearSearchButton"
            aria-label="Clear search"
            type="button"
            className="delete"
            onClick={onClearSearch}
          />
        </span>
      )}
    </p>
  </form>
);
