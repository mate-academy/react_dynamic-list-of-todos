import React from 'react';

import { Filter } from '../../types/Filter';

interface Props {
  setFilterBy: (value: Filter | string) => void;
  setQuery: (query: string) => void;
  query: string;
}

export const TodoFilter: React.FC<Props> = ({
  setFilterBy: setValue,
  query, setQuery,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(e) => setValue(e.target.value)}
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
          onChange={(e) => setQuery(e.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query.length > 0
            && (
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                aria-label="Clear Search Button"
                onClick={() => setQuery('')}
              />
            )}
        </span>
      </p>
    </form>
  );
};
