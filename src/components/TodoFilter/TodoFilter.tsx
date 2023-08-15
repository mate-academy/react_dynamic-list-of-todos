import React from 'react';

type Props = {
  onSetFilter: (filter: string) => void
  query: string,
  onChangeQuery: (query: string) => void
};

export const TodoFilter: React.FC<Props> = ({
  onSetFilter, query, onChangeQuery,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          onChange={(event) => onSetFilter(event.target.value.trim())}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </span>
    </p>

    <p className="control is-expanded has-icons-left has-icons-right">
      <input
        value={query}
        onChange={(event) => onChangeQuery(event.target.value)}
        data-cy="searchInput"
        type="text"
        className="input"
        placeholder="Search..."
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {query && (
          <button
            onClick={() => onChangeQuery('')}
            aria-label={query}
            data-cy="clearSearchButton"
            type="button"
            className="delete"
          />
        )}
      </span>
    </p>
  </form>
);
