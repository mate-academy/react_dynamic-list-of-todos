import React, { ChangeEvent } from 'react';

type Props = {
  query: string,
  onFilterChange: (event: ChangeEvent<HTMLSelectElement>) => void,
  onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void,
  onReset: () => void,
};

export const TodoFilter: React.FC<Props> = ({
  query,
  onFilterChange,
  onSearchChange,
  onReset,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select data-cy="statusSelect" onChange={onFilterChange}>
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
        value={query}
        className="input"
        placeholder="Search..."
        onChange={onSearchChange}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {query && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          <button
            data-cy="clearSearchButton"
            type="button"
            aria-label="delete"
            className="delete"
            onClick={onReset}
          />
        </span>
      )}
    </p>
  </form>
);
