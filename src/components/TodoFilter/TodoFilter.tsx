import React, { useState } from 'react';

interface TodoFilterProps {
  onFilterChange: (value: string) => void;
  onSearchChange: (value: string) => void;
  onClearSearch: () => void;
}

export const TodoFilter: React.FC<TodoFilterProps> = ({
  onFilterChange,
  onSearchChange,
  onClearSearch,
}) => {
  const [searchValue, setSearchValue] = useState('');

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    onFilterChange(value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setSearchValue(value);
    onSearchChange(value);
  };

  const handleClearSearch = () => {
    setSearchValue('');
    onClearSearch();
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleFilterChange}>
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
          value={searchValue}
          onChange={handleSearchChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {searchValue && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClearSearch}
              aria-label="Clear Search"
            />
          </span>
        )}
      </p>
    </form>
  );
};
