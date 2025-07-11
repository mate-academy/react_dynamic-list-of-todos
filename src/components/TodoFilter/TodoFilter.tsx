import React from 'react';

interface Props {
  query: string;
  setQuery: (value: string) => void;
  statusFilter: 'all' | 'completed' | 'active';
  setStatusFilter: (value: 'all' | 'completed' | 'active') => void;
  resetFilter: () => void;
}

export const TodoFilter: React.FC<Props> = ({
  query,
  setQuery,
  statusFilter,
  setStatusFilter,
  resetFilter,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={statusFilter}
            onChange={e =>
              setStatusFilter(e.target.value as 'all' | 'active' | 'completed')
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
          onChange={e => setQuery(e.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {(query !== '' || statusFilter !== 'all') && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={resetFilter}
            />
          </span>
        )}
      </p>
    </form>
  );
};
