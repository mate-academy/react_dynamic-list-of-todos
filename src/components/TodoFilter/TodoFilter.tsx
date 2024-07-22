import React from 'react';

type Props = {
  status: string;
  searchTerm: string;
  onStatusChange: (status: string) => void;
  onSearchChange: (searchTerm: string) => void;
  onDeleteSearchChange: () => void;
};

export const TodoFilter: React.FC<Props> = ({
  status,
  searchTerm,
  onStatusChange,
  onSearchChange,
  onDeleteSearchChange,
}) => {
  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onStatusChange(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
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
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {searchTerm && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={onDeleteSearchChange}
            />
          )}
        </span>
      </p>
    </form>
  );
};
