import React from 'react';
// eslint-disable-next-line import/no-cycle

type Props = {
  query: string;
  applyQuery: (query: string) => void;
  setFilterBy: (filter: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  applyQuery,
  setFilterBy,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          onChange={(e) => {
            setFilterBy(e.target.value);
          }}
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
        onChange={(e) => {
          applyQuery(e.target.value);
        }}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      { query && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => {
              applyQuery('');
            }}
          />
        </span>
      )}
    </p>
  </form>
);
