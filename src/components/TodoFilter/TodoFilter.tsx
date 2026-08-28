import React from 'react';

type Props = {
  status: string;
  onStatusChange: (status: string) => void;
  query: string;
  onQueryChange: (query: string) => void;
};

export const TodoFilter = ({
  status,
  onStatusChange,
  query,
  onQueryChange,
}: Props) => (
  <>
    <select
      data-cy="statusSelect"
      value={status}
      onChange={event => onStatusChange(event.target.value)}
    >
      <option value="all">All</option>
      <option value="completed">Completed</option>
      <option value="active">Active</option>
    </select>

    <p className="control is-expanded has-icons-left has-icons-right">
      <input
        data-cy="searchInput"
        type="text"
        className="input"
        placeholder="Search..."
        value={query}
        onChange={event => onQueryChange(event.target.value)}
      />

      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {query && (
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => onQueryChange('')}
          />
        )}
      </span>
    </p>
  </>
);
