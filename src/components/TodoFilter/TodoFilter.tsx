import React, { ChangeEvent } from 'react';
import { Status, useAppContext } from '../../StoreApp';

export const TodoFilter: React.FC = () => {
  const {
    filter,
    setFilter,
    setSearchedTodos,
    searchTerm,
    clearSearchTerm,
  } = useAppContext();

  const handleFilterChange = (status: Status) => {
    setFilter(status);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchedTodos(event.target.value);
  };

  const handleClearSearch = () => {
    clearSearchTerm();
  };

  const statusOptions = [Status.All, Status.Active, Status.Completed];

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter}
            onChange={(event) => handleFilterChange(
              event.target.value as Status,
            )}
          >
            {statusOptions.map(status => (
              <option
                key={status}
                value={status}
              >
                {status}
              </option>
            ))}
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
          onChange={handleSearchChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {searchTerm && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClearSearch}
            />
          </span>
        )}
      </p>
    </form>
  );
};
