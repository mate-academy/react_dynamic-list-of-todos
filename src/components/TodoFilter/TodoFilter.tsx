import React from 'react';

type Props = {
  query: string;
  onQueryChange: (value: string) => void;
  onClearQuery: () => void;
  status: string;
  onStatusChange: (value: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  onQueryChange,
  onClearQuery,
  status,
  onStatusChange,
}) => {
  return (
    <div className="field is-grouped is-grouped-multiline">
      {/* Search field */}
      <div className="control has-icons-right is-expanded" data-cy="search">
        <input
          className="input"
          type="text"
          placeholder="Search todos..."
          value={query}
          onChange={e => onQueryChange(e.target.value)}
          data-cy="searchInput"
        />
        {query !== '' && (
          <button
            type="button"
            onClick={onClearQuery}
            data-cy="clearSearchButton"
            aria-label="Clear search"
            style={{
              position: 'absolute',
              right: '0.75rem',
              top: '0.65rem',
              background: 'none',
              border: 'none',
              padding: '0.25rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <i className="fas fa-times" />
          </button>
        )}
      </div>

      {/* Status filter */}
      <div className="control" data-cy="status">
        <div className="select">
          <select
            value={status}
            onChange={e => onStatusChange(e.target.value)}
            data-cy="statusSelect"
          >
            <option value="all" data-cy="statusOptionAll">
              All
            </option>
            <option value="active" data-cy="statusOptionActive">
              Active
            </option>
            <option value="completed" data-cy="statusOptionCompleted">
              Completed
            </option>
          </select>
        </div>
      </div>
    </div>
  );
};
