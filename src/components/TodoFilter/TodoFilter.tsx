import React from 'react';

type Props = {
  query: string;
  onQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  resetInput: () => void;
  statusFilter: string;
  onStatusChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  onQueryChange,
  resetInput,
  statusFilter,
  onStatusChange,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          value={statusFilter}
          onChange={onStatusChange}
          data-cy="statusSelect"
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
        onChange={onQueryChange}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <button
          onClick={resetInput}
          data-cy="clearSearchButton"
          type="button"
          className="delete"
        />
      </span>
    </p>
  </form>
);
