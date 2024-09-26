import React, { useState } from 'react';

interface TodoFilterProps {
  onFilterChange: (status: string) => void;
  onSearchChange: (term: string) => void;
}

export const TodoFilter: React.FC<TodoFilterProps> = ({
  onFilterChange,
  onSearchChange,
}) => {
  const [status, setStatus] = useState('all');
  const [searchText, setSearchText] = useState('');

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedStatus = event.target.value;

    setStatus(selectedStatus);
    onFilterChange(selectedStatus);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;

    setSearchText(searchValue);
    onSearchChange(searchValue);
  };

  const handleSearchClear = () => {
    setSearchText('');
    onSearchChange('');
    onFilterChange(status);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
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
          value={searchText}
          onChange={handleSearchChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={handleSearchClear}
          />
        </span>
      </p>
    </form>
  );
};
