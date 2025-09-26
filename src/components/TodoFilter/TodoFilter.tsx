import React from 'react';

interface Props {
  query: string;
  onQueryChange: (value: string) => void;
  status: 'all' | 'completed' | 'active';
  onStatusChange: (value: 'all' | 'completed' | 'active') => void;
}

export const TodoFilter: React.FC<Props> = ({
  query,
  onQueryChange,
  status,
  onStatusChange,
}) => {
  return (
    <div className="field is-grouped">
      <p className="control is-expanded">
        <input
          type="text"
          className="input"
          placeholder="Search todos..."
          value={query}
          onChange={e => onQueryChange(e.target.value)}
        />
      </p>
      {query && (
        <button
          type="button"
          className="button is-light"
          onClick={() => onQueryChange('')}
        >
          ✖
        </button>
      )}
      <div className="select">
        <select
          value={status}
          onChange={e =>
            onStatusChange(e.target.value as 'all' | 'completed' | 'active')
          }
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="active">Active</option>
        </select>
      </div>
    </div>
  );
};
