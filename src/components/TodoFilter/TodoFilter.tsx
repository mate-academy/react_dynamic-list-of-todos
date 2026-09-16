import React from 'react';

type Props = {
  query: string;
  status: string;
  onQueryChange: (query: string) => void;
  onStatusChange: (status: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  status,
  onQueryChange,
  onStatusChange,
}) => (
  <form className="field has-addons" onSubmit={e => e.preventDefault()}>
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

    <p className="control is-expanded has-icons-right">
      <input
        type="text"
        className="input"
        placeholder="Search..."
        data-cy="searchInput"
        value={query}
        onChange={e => onQueryChange(e.target.value)}
      />
      {query && (
        <span className="icon is-right" style={{ pointerEvents: 'initial' }}>
          <button
            type="button"
            className="delete"
            data-cy="clearSearchButton"
            aria-label="clear search input"
            onClick={() => onQueryChange('')}
          />
        </span>
      )}
    </p>
  </form>
);