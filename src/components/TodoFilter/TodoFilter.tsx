import React from 'react';

interface Props {
  setCurrentCase: (tabId: string)=> void,
  setCurrentQuery: (tabId: string)=> void,
  cases: string,
  query: string,
}

export const TodoFilter: React.FC<Props> = ({
  setCurrentCase,
  cases,
  setCurrentQuery,
  query,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            value={cases}
            data-cy="statusSelect"
            onChange={(event) => {
              setCurrentCase(event.target.value);
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
          onChange={(event) => {
            setCurrentQuery(event.target.value);
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => setCurrentQuery('')}
          />
        </span>
      </p>
    </form>
  );
};
