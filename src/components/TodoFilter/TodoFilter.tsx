import React from 'react';
import { FilterStatus } from '../../types/FilterStatus';
interface TodoFilterProps {
  searchQuery: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedFilter: FilterStatus;
  onFilterChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const TodoFilter: React.FC<TodoFilterProps> = ({
  searchQuery,
  onSearchChange,
  selectedFilter,
  onFilterChange,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={selectedFilter}
          onChange={onFilterChange}
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
        value={searchQuery}
        onChange={onSearchChange}
        type="text"
        className="input"
        placeholder="Search..."
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {searchQuery && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() =>
              onSearchChange({
                target: { value: '' },
              } as React.ChangeEvent<HTMLInputElement>)
            }
          />
        </span>
      )}
    </p>
  </form>
);
