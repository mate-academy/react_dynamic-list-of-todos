import React from 'react';
import { Status } from '../../types/Status';

type Props = {
  query: string;
  setQuery: (value: string) => void;
  setFilter: (value: Status) => void;
};

const FILTER_VALUES = [Status.all, Status.active, Status.completed];

export const TodoFilter: React.FC<Props> = (
  {
    query,
    setQuery,
    setFilter,
  },
) => {
  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value as Status);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleFilterChange}
          >
            {FILTER_VALUES.map(v => (
              <option
                value={v}
                key={v}
              >
                {(Status[v])}
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
          onChange={handleQueryChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span
            className="icon is-right"
            style={{ pointerEvents: 'all' }}
          >
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => {
                setQuery('');
              }}
            />
          </span>
        )}
      </p>
    </form>
  );
};
