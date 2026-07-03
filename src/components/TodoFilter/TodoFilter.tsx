import React from 'react';

interface Props {
  query: string;
  onQueryChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
}

export const TodoFilter: React.FC<Props> = ({
  query,
  onQueryChange,
  status,
  onStatusChange,
}) => {
  return (
    <form className="field has-addons" onSubmit={e => e.preventDefault()}>
      <div className="control has-icons-left is-expanded">
        <input
          type="text"
          className="input"
          data-cy="searchInput"
          placeholder="Filter by title"
          value={query}
          onChange={e => onQueryChange(e.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-search" />
        </span>
        {query && (
          <button
            type="button"
            className="clear-button"
            data-cy="clearSearchButton"
            onClick={() => onQueryChange('')}
            aria-label="Clear search"
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              zIndex: 4,
            }}
          >
            <i className="fas fa-times" />
          </button>
        )}
      </div>

      <div className="control">
        <span className="select">
          <select
            value={status}
            onChange={e => onStatusChange(e.target.value)}
            data-cy="statusSelect"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </div>
    </form>
  );
};
