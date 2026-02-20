import React from 'react';

type Props = {
  query: string;
  setQuery: (val: string) => void;
  status: string;
  setStatus: (val: string) => void;
};
export const TodoFilter: React.FC<Props> = ({
  query,
  setQuery,
  status,
  setStatus,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={status}
          onChange={e => setStatus(e.target.value)}
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
        onChange={event => {
          setQuery(event.target.value);
        }}
        value={query}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          <button
            data-cy="clearSearchButton"
            type="button"
            className={query ? "delete" : "is-hidden"}
            aria-label="Clear search"
            onClick={() => setQuery('')}
          />
      </span>
    </p>
  </form>
);
