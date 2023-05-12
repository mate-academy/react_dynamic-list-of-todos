import React from 'react';

interface Props {
  setCurrentCase: (tabId: React.ChangeEvent<HTMLSelectElement>)=> void,
  setCurrentQuery: (tabId: string)=> void,
  cases: string,
  query: string,
}

enum SortType {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
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
            onChange={setCurrentCase}
          >
            <option value={SortType.All}>All</option>
            <option value={SortType.Active}>Active</option>
            <option value={SortType.Completed}>Completed</option>
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
          {query.length > 0 && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setCurrentQuery('')}
              aria-label="Username"
            />
          )}

        </span>
      </p>
    </form>
  );
};
