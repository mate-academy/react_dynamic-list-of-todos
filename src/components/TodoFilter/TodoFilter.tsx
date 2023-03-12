import React from 'react';
import { Filter } from '../../types/Filter';

type Props = {
  filterBy: Filter;
  setFilterBy: (filterBy: Filter) => void;
  query: string;
  setQuery: (query: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  filterBy,
  setFilterBy,
  query,
  setQuery,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterBy}
            onChange={({ target }) => {
              setFilterBy(target.value as Filter);
            }}
          >
            <option value={Filter.ALL}>All</option>
            <option value={Filter.ACTIVE}>Active</option>
            <option value={Filter.COMPLETED}>Completed</option>
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
            setQuery(e.target.value.trim());
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              aria-label="Delete"
              onClick={() => {
                setQuery('');
              }}
            />
          </span>
        )}
      </p>
    </form>
  );
};
