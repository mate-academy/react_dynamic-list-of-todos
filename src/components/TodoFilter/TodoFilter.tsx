import * as React from 'react';
import { useState } from 'react';
import { Status } from '../../types/Status';

type TodoFilterProps = {
  onStatusChange: (status: Status) => void;
  onQueryChange: (query: string) => void;
};

export const TodoFilter = ({
  onStatusChange,
  onQueryChange,
}: TodoFilterProps) => {
  const [status, setStatus] = useState<Status>('all');
  const [query, setQuery] = useState('');

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as Status;

    setStatus(value);
    onStatusChange(value);
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onQueryChange(e.target.value);
  };

  return (
    <form className="field has-addons" onSubmit={e => e.preventDefault()}>
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
          onChange={handleQueryChange}
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
              aria-label="Clear search"
              onClick={() => {
                setQuery('');
                onQueryChange('');
              }}
            />
          </span>
        )}
      </p>
    </form>
  );
};
