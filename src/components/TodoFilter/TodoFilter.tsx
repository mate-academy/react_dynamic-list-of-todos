import React from 'react';
import cn from 'classnames';

interface TodoFilterProps {
  filterStatus: 'all' | 'active' | 'completed';
  onFilterStatusChange: (s: 'all' | 'active' | 'completed') => void;
  query: string;
  onQueryChange: (q: string) => void;
}

export const TodoFilter: React.FC<TodoFilterProps> = ({
  filterStatus,
  onFilterStatusChange,
  query,
  onQueryChange,
}) => {
  return (
    <div className="block">
      <div className="field has-addons" style={{ justifyContent: 'center' }}>
        <div className="control">
          <input
            data-cy="searchInput"
            className="input"
            placeholder="Search todos..."
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
          />
        </div>

        <div className="control">
          {query ? (
            <button
              data-cy="clearButton"
              type="button"
              className="button"
              onClick={() => onQueryChange('')}
            >
              Clear
            </button>
          ) : null}
        </div>

        <div className="control">
          <div className="select">
            <select
              data-cy="statusSelect"
              value={filterStatus}
              onChange={(e) =>
                // eslint-disable-next-line max-len
                onFilterStatusChange(e.target.value as 'all' | 'active' | 'completed')
              }
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      <div className="buttons has-addons is-centered" data-cy="filterButtons">
        {(['all', 'active', 'completed'] as const).map((f) => (
          <button
            key={f}
            type="button"
            className={cn('button', { 'is-info': filterStatus === f })}
            onClick={() => onFilterStatusChange(f)}
            data-cy={`filter-${f}`}
          >
            {f[0].toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};
