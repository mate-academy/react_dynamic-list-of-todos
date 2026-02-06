import React from 'react';

type Status = 'all' | 'active' | 'completed';

type Props = {
  query: string;
  status: Status;
  onQueryChange: (value: string) => void;
  onStatusChange: (value: Status) => void;
  onClearQuery: () => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  status,
  onQueryChange,
  onStatusChange,
  onClearQuery,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={e => onStatusChange(e.target.value as Status)}
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

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              type="button"
              className="delete"
              data-cy="clearSearchButton"
              onClick={onClearQuery}
            />
          </span>
        )}
      </p>
    </form>
  );
};
