import React from 'react';
interface Props {
  statusFilter: string;
  onFilterChange: (status: string) => void;
  query: string;
  onSearchChange: (query: string) => void;
}

export const TodoFilter: React.FC<Props> = ({
  statusFilter,
  onFilterChange,
  query,
  onSearchChange,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={statusFilter}
          onChange={e => onFilterChange(e.target.value)}
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
        value={query}
        onChange={e => onSearchChange(e.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {query && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => onSearchChange('')}
          />
        </span>
      )}
    </p>
  </form>
);
