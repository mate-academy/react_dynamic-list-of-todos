import React from 'react';

export type TodoStatus = 'all' | 'active' | 'completed';

type Props = {
  status: TodoStatus;
  query: string;
  onStatusChange: (value: TodoStatus) => void;
  onQueryChange: (value: string) => void;
  onClear: () => void;
};

export const TodoFilter: React.FC<Props> = ({
  status,
  query,
  onStatusChange,
  onQueryChange,
  onClear,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={status}
          onChange={e => onStatusChange(e.target.value as TodoStatus)}
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
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={onClear}
          />
        </span>
      )}
    </p>
  </form>
);
