/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';

interface Props {
  query: string;
  sort: string;
  setQuery: (query:string) => void;
  setSort: (sort: string) => void;
}

export const TodoFilter: React.FC<Props> = ({
  query,
  sort,
  setQuery,
  setSort,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={sort}
          onChange={(event) => setSort(event.target.value)}
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
        onChange={(event) => setQuery(event.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {query && (
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => setQuery('')}
          />
        )}

      </span>
    </p>
  </form>
);
