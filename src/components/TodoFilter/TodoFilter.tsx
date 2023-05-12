import React from 'react';

type Props = {
  onSetFilter: (event:React.ChangeEvent<HTMLSelectElement>) => void;
  query: string;
  onSetQuery: (event:React.ChangeEvent<HTMLInputElement>) => void;
  resetQuery: () => void;
};

export const TodoFilter:React.FC<Props> = ({
  onSetFilter,
  query,
  onSetQuery,
  resetQuery,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          onChange={(event) => onSetFilter(event)}
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
        onChange={event => onSetQuery(event)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {query
        && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => resetQuery()}
            />
          </span>
        )}
    </p>
  </form>
);
