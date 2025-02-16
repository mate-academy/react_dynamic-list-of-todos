import React from 'react';

type Props = {
  filter: string;
  onFilterChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
  onClear: () => void;
};

export const TodoFilter: React.FC<Props> = ({
  filter,
  onFilterChange,
  status,
  onStatusChange,
  onClear,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={e => onStatusChange(e.target.value)}
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
          value={filter}
          onChange={e => onFilterChange(e.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-search" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {filter && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={onClear}
            />
          )}
        </span>
      </p>
    </form>
  );
};
