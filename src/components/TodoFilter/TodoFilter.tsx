import React from 'react';

type Props = {
  setFilter: (filter: string) => void,
  filter: string,
  query: string,
  setQuery: (query: string) => void,
  applyQuery: (query: string) => void,
};

export const TodoFilter: React.FC<Props> = ({
  setFilter,
  filter,
  query,
  setQuery,
  applyQuery,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter}
            onChange={({ target }) => setFilter(target.value)}
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
          onChange={({ target }) => {
            setQuery(target.value);
            applyQuery(target.value);
          }}
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
              onClick={() => {
                setQuery('');
                applyQuery('');
              }}
            />
          </span>
        )}
      </p>
    </form>
  );
};
