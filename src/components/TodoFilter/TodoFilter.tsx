import React from 'react';
import { Status } from '../../types/Status';

type Props = {
  query: string;
  setQuery: (s: string) => void;
  filter: Status;
  setFilter: (s: Status) => void;
};

export const TodoFilter: React.FC<Props> = React.memo(
  ({ query, setQuery, filter, setFilter }) => {
    const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value);
    };

    const handleFilterChange = (
      event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
      setFilter(event.target.value as Status);
    };

    const handleQueryReset = () => {
      setQuery('');
    };

    return (
      <form className="field has-addons">
        <p className="control">
          <span className="select">
            <select
              data-cy="statusSelect"
              value={filter}
              onChange={handleFilterChange}
            >
              <option value={Status.all}>All</option>
              <option value={Status.active}>Active</option>
              <option value={Status.completed}>Completed</option>
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
                onClick={handleQueryReset}
              />
            </span>
          )}
        </p>
      </form>
    );
  },
);
