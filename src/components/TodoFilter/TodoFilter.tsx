import React from 'react';
import { FilterStatus } from '../../types/FilterStatus';

interface Props {
  currentFilter: FilterStatus;
  onFilterChange: (filter: FilterStatus) => void;
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  onClearSearch: () => void;
}

export const TodoFilter: React.FC<Props> = ({
  currentFilter,
  onFilterChange,
  searchTerm,
  onSearchTermChange,
  onClearSearch,
}) => (
  <form className="field has-addons" onSubmit={e => e.preventDefault()}>
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={currentFilter}
          onChange={e => onFilterChange(e.target.value as FilterStatus)}
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
        value={searchTerm}
        onChange={e => onSearchTermChange(e.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        {searchTerm && (
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={onClearSearch}
          />
        )}
      </span>
    </p>
  </form>
);
