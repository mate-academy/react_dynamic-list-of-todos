import React, { useState } from 'react';
import { FilterOptions } from '../../types/FilterOptions';

type Props = {
  onFilterChange: (filter: FilterOptions) => void;
  onSearchChange: (query: string) => void;
  onClose: () => void;
};

export const TodoFilter: React.FC<Props> = ({
  onFilterChange,
  onSearchChange,
  onClose,
}) => {
  const [filter, setFilter] = useState<FilterOptions>(FilterOptions.All);
  const [searchQuery, setSearchQuery] = useState('');

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newFilter = event.target.value as FilterOptions;

    setFilter(newFilter);
    onFilterChange(newFilter);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    onSearchChange(event.target.value);
  };

  const handleSearchClear = () => {
    setSearchQuery('');
    onClose();
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter}
            onChange={handleFilterChange}
          >
            <option value={FilterOptions.All}>All</option>
            <option value={FilterOptions.Active}>Active</option>
            <option value={FilterOptions.Completed}>Completed</option>
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
          {searchQuery && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleSearchClear}
            />
          )}
        </span>
      </p>
    </form>
  );
};
