import React from 'react';

interface Props {
  statusFilter: 'all' | 'completed' | 'active';
  onStatusChange: (value: 'all' | 'completed' | 'active') => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onClearSearch: () => void;
}

export const TodoFilter: React.FC<Props> = ({
  statusFilter,
  onStatusChange,
  searchQuery,
  onSearchChange,
  onClearSearch,
}) => {
  return (
    <div className="field is-grouped">
      <p className="control">
        <span className="select">
          <select
            value={statusFilter}
            onChange={e =>
              onStatusChange(e.target.value as 'all' | 'completed' | 'active')
            }
            data-cy="filter"
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="active">Active</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-right">
        <input
          className="input"
          type="text"
          placeholder="Filter by title"
          value={searchQuery}
          onChange={e => onSearchChange(e.target.value)}
          data-cy="search"
        />
        {searchQuery && (
          <button
            type="button"
            className="delete is-small"
            onClick={onClearSearch}
            data-cy="searchClear"
          />
        )}
      </p>
    </div>
  );
};
