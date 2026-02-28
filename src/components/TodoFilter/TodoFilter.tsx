import React from 'react';

export type StatusFilter = 'all' | 'active' | 'completed';

type Props = {
  status: StatusFilter;
  query: string;
  onStatusChange: (value: StatusFilter) => void;
  onQueryChange: (value: string) => void;
  onQueryClear: () => void;
};

export const TodoFilter: React.FC<Props> = ({
  status,
  query,
  onStatusChange,
  onQueryChange,
  onQueryClear,
}) => {
  const showClearButton = query.trim().length > 0;

  return (
    <form className="field has-addons" onSubmit={e => e.preventDefault()}>
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={e => onStatusChange(e.target.value as StatusFilter)}
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
          onChange={e => onQueryChange(e.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {showClearButton && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={onQueryClear}
            />
          </span>
        )}
      </p>
    </form>
  );
};
