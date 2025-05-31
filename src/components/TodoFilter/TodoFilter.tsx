import React from 'react';

type TodoFilterProps = {
  query: string;
  onQueryChange: (query: string) => void;
  onClear: () => void;
  status: 'all' | 'active' | 'completed';
  onStatusChange: (status: 'all' | 'active' | 'completed') => void;
};

export const TodoFilter: React.FC<TodoFilterProps> = ({
  query,
  onQueryChange,
  onClear,
  status,
  onStatusChange,
}) => (
  <form className="field has-addons" onSubmit={e => e.preventDefault()}>
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={status}
          onChange={e =>
            onStatusChange(e.target.value as 'all' | 'active' | 'completed')
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
        onChange={e => onQueryChange(e.target.value)}
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
            onClick={onClear}
            style={{ cursor: 'pointer' }}
          />
        )}
      </span>
    </p>
  </form>
);
