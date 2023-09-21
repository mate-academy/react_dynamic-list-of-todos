import React from 'react';

export type StatusFilter = 'all' | 'completed' | 'active';

type TodoFilterProps = {
  titleFilter: string;
  statusFilter: StatusFilter;
  handleTitleFilterChange: (text: string) => void;
  handleStatusFilterChange: (status: StatusFilter) => void;
};

export const TodoFilter: React.FC<TodoFilterProps> = ({
  titleFilter,
  statusFilter,
  handleTitleFilterChange,
  handleStatusFilterChange,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={statusFilter}
          onChange={e => (
            handleStatusFilterChange(e.target.value as StatusFilter)
          )}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </span>
    </p>

    <p className="control is-expanded has-icons-left has-icons-right">
      <input
        value={titleFilter}
        onChange={e => handleTitleFilterChange(e.target.value)}
        data-cy="searchInput"
        type="text"
        className="input"
        placeholder="Search..."
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {titleFilter
      && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => handleTitleFilterChange('')}
          />
        </span>
      )}
    </p>
  </form>
);
