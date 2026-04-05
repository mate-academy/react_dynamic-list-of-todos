import React from 'react';

type Props = {
  query: string;
  setQuery: (query: string) => void;
  setStatus: (status: 'all' | 'active' | 'completed') => void;
};

export const TodoFilter: React.FC<Props> = ({ query, setStatus, setQuery }) => {
  function handleStatusChange(value: string) {
    if (value === 'all' || value === 'active' || value === 'completed') {
      setStatus(value);
    } else {
      setStatus('all');
    }
  }

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={event => handleStatusChange(event.target.value)}
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
          value={query}
          placeholder="Search..."
          onChange={event => setQuery(event.target.value)}
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
              onClick={() => setQuery('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
