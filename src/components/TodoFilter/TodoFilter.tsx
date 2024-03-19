import React from 'react';
import { Status } from '../enums/Status';

type Props = {
  setFilter: (filter: Status) => void;
  setQuery: (query: string) => void;
  query: string;
};

export const TodoFilter: React.FC<Props> = ({ setFilter, setQuery, query }) => {
  const getStatus = (status: string) =>
    status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={event => setFilter(event.target.value as Status)}
          >
            {Object.values(Status).map(status => (
              <option key={status} value={status}>
                {getStatus(status)}
              </option>
            ))}
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
              className="delete"
              onClick={() => setQuery('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
