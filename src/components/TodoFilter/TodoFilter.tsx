import React from 'react';
import { StatusOfFilter } from '../TodoList';

type Props = {
  status: StatusOfFilter;
  handleChange: (value: StatusOfFilter) => void;
  query: string;
  setQuery: (arg: string) => void;
};

export const TodoFilter: React.FC<Props> = (
  {
    status,
    handleChange,
    query,
    setQuery,
  },
) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            value={status}
            data-cy="statusSelect"
            onChange={(event) => handleChange(
              event.target.value as StatusOfFilter,
            )}
          >
            <option value={StatusOfFilter.All}>All</option>
            <option value={StatusOfFilter.Active}>Active</option>
            <option value={StatusOfFilter.Completed}>Completed</option>
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
          onChange={event => setQuery(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              aria-label="Clear search"
              className="delete"
              onClick={() => setQuery('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
