import React, { useState } from 'react';

interface TodoFilterProps {
  onFilter: (searchText: string, status: string) => void;
}

export const TodoFilter: React.FC<TodoFilterProps> = ({ onFilter }) => {
  const [searchText, setSearchText] = useState<string>('');
  const [status, setStatus] = useState<string>('all');

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;

    setStatus(newStatus);
    onFilter(searchText, newStatus);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchText = e.target.value;

    setSearchText(newSearchText);
    onFilter(newSearchText, status);
  };

  const handleClearSearch = () => {
    setSearchText('');
    onFilter('', status);
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
          <i className="fas fa-search" />
        </span>

        <span className="icon is-right">
          {searchText.length > 0 && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              aria-label="Clear search"
              onClick={handleClearSearch}
            />
          )}
        </span>
      </p>
    </form>
  );
};
