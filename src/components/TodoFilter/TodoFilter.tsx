import React from 'react';

type TodoFilterProps = {
  filter: string;
  search: string;
  onFilterChange: (filter: string) => void;
  onSearchChange: (search: string) => void;
};

export const TodoFilter: React.FC<TodoFilterProps> = ({
  filter,
  search,
  onFilterChange,
  onSearchChange,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={filter}
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
        value={search}
        onChange={e => onSearchChange(e.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        {search && (
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => onSearchChange('')}
          />
        )}
      </span>
    </p>
  </form>
);
