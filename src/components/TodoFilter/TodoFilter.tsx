import React from 'react';
import { Status } from '../../types/Status';

type TodoFilterProps = {
  status: Status;
  searchText: string;
  onFilterChange: (status: Status, searchText: string) => void;
};

export const TodoFilter: React.FC<TodoFilterProps> = ({
  status,
  searchText,
  onFilterChange,
}) => {
  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange(event.target.value as Status, searchText);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange(status, event.target.value);
  };

  const handleClear = () => {
    onFilterChange(status, '');
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
            <option value={Status.All}>All</option>
            <option value={Status.Active}>Active</option>
            <option value={Status.Completed}>Completed</option>
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
          onChange={handleTextChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {searchText && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClear}
            />
          </span>
        )}
      </p>
    </form>
  );
};
