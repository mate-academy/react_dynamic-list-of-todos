import React from 'react';

type Props = {
  query: string;
  setQuery: (value: string) => void;
  status: 'all' | 'active' | 'completed';
  setStatus: (value: 'all' | 'active' | 'completed') => void;
  userId: number | 'all';
  setUserId: (value: number | 'all') => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  setQuery,
  status,
  setStatus,
  userId,
  setUserId,
}) => (
  <form className="field has-addons" onSubmit={event => event.preventDefault()}>
    {/* Status select */}
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={status}
          onChange={event =>
            setStatus(event.target.value as 'all' | 'active' | 'completed')
          }
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </span>
    </p>

    {/* Search input */}
    <p className="control is-expanded has-icons-left has-icons-right">
      <input
        data-cy="searchInput"
        type="text"
        className="input"
        placeholder="Search..."
        value={query}
        onChange={event => setQuery(event.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {query && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => setQuery('')}
          />
        </span>
      )}
    </p>

    {/* User select */}
    <p className="control">
      <span className="select">
        <select
          data-cy-root="userSelect"
          value={userId}
          onChange={e =>
            setUserId(e.target.value === 'all' ? 'all' : Number(e.target.value))
          }
        >
          <option value="all">All users</option>
          <option value={1}>User 1</option>
          <option value={2}>User 2</option>
          <option value={3}>User 3</option>
        </select>
      </span>
    </p>
  </form>
);
