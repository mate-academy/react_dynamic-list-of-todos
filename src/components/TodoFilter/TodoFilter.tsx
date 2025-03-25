import React from 'react';

type Props = {
  query: string;
  setQuery: (value: string) => void;
  setShowOnly: (value: string) => void;
};

// eslint-disable-next-line react/display-name
export const TodoFilter: React.FC<Props> = React.memo(
  ({ query, setQuery, setShowOnly }) => {
    const handleQueryChange = (value: string) => {
      setQuery(value);
    };

    const handleShowOnlyChange = (value: string) => {
      setShowOnly(value);
    };

    return (
      <form className="field has-addons">
        <p className="control">
          <span className="select">
            <select
              data-cy="statusSelect"
              onChange={event => handleShowOnlyChange(event.target.value)}
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
            onChange={event => handleQueryChange(event.target.value)}
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
  },
  (prev, next) => {
    const prevQuery = prev.query;
    const nextQuery = next.query;

    return prevQuery === nextQuery;
  },
);
