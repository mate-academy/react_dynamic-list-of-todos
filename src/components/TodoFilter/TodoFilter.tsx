import React, { useEffect, useState } from 'react';
import { FilterType } from '../../types/FilterType';

interface TodoFilterProps {
  onFilterChange: (filter: FilterType, searchQuery: string) => void;
}

export const TodoFilter: React.FC<TodoFilterProps> = ({ onFilterChange }) => {
  const [statusFilter, setStatusFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newFilter = event.target.value as FilterType;

    setStatusFilter(newFilter);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchReset = () => {
    setSearchQuery('');
    setStatusFilter('all');
  };

  useEffect(() => {
    onFilterChange(statusFilter, searchQuery);
  }, [statusFilter, searchQuery, onFilterChange]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={statusFilter}
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
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {searchQuery && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleSearchReset}
            />
          )}
        </span>
      </p>
    </form>
  );
};
