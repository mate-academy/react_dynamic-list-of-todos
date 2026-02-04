import React from 'react';

type Props = {
  query: string;
  onStatusChange: (el: 'all' | 'active' | 'completed') => void;
  onQueryChange: (el: string) => void;
  status: 'all' | 'active' | 'completed';
};

export const TodoFilter: React.FC<Props> = ({
  query,
  onStatusChange,
  onQueryChange,
  status,
}) => {
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    onStatusChange(e.target.value as 'all' | 'active' | 'completed');

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={handleStatusChange}
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
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {query && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => {
                onQueryChange('');
              }}
            />
          )}
        </span>
      </p>
    </form>
  );
};
