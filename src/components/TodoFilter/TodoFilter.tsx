import React from 'react';

type Props = {
  query: string;
  handleSearch: (value: string) => void;
  handleFilter: (value: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  handleSearch,
  handleFilter,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(event) => handleFilter(event.target.value)}
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
          onChange={(event) => handleSearch(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {query.length > 0 && (
            <button
              data-cy="clearSearchButton"
              aria-label="resetSearch"
              type="button"
              className="delete"
              onClick={() => handleSearch('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
