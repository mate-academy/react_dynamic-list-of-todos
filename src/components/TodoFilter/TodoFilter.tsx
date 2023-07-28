import React from 'react';
import { Status } from '../../types/Status';

type Props = {
  query: string,
  status: Status,
  setQuery: (query: string) => void;
  setStatus: (status: Status) => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  status,
  setQuery,
  setStatus,
}) => {
  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value as Status);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            value={status}
            data-cy="statusSelect"
            onChange={handleStatusChange}
          >
            <option value={Status.all}>All</option>
            <option value={Status.active}>Active</option>
            <option value={Status.completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          value={query}
          onChange={event => setQuery(event.target.value)}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {query && (
            /* eslint-disable-next-line jsx-a11y/control-has-associated-label */
              <button
                onClick={() => setQuery('')}
                data-cy="clearSearchButton"
                type="button"
                className="delete"
              />
            )}
          </span>
        )}
      </p>
    </form>
  );
};
