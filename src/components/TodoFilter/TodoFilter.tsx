import React from 'react';

type Props = {
  statusFilter: string;
  searchQuery: string;
  onStatusChange: (status: string) => void;
  onSearchChange: (query: string) => void;
  onClearSearch: () => void;
};

export const TodoFilter: React.FC<Props> = ({
  statusFilter,
  searchQuery,
  onStatusChange,
  onSearchChange,
  onClearSearch,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value)}
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
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {searchQuery && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={onClearSearch}
          />
        </span>
      )}
    </p>
  </form>
);
