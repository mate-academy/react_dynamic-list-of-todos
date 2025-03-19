import React from 'react';

type StatusFilter = 'all' | 'completed' | 'active';

type TodoFilterProps = {
  query: string;
  statusFilter: StatusFilter | null;
  handleFilterChange: (newStatus: StatusFilter, newQuery: string) => void;
  handleRemoveText: () => void;
};

export const TodoFilter: React.FC<TodoFilterProps> = ({
  query,
  statusFilter,
  handleFilterChange,
  handleRemoveText,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={statusFilter as StatusFilter}
            onChange={e =>
              handleFilterChange(e.target.value as StatusFilter, query)
            }
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
          onChange={e =>
            handleFilterChange(statusFilter || 'all', e.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={handleRemoveText}
          />
        </span>
      </p>
    </form>
  );
};
