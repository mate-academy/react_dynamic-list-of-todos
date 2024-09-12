import React from 'react';

type Props = {
  query: string;
  setQuery: (e: string) => void;
  setFilter: (e: string) => void;
};
/* eslint-disable react/display-name */
export const TodoFilter: React.FC<Props> = React.memo(
  ({ query, setQuery, setFilter }) => {
    const handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
    };

    return (
      <form className="field has-addons">
        <p className="control">
          <span className="select">
            <select
              data-cy="statusSelect"
              onChange={e => setFilter(e.target.value)}
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
            onChange={handleQuery}
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
      </form>
    );
  },
);
