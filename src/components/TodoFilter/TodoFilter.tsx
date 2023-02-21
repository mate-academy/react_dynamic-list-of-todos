import React from 'react';
import { FilterType } from '../../types/FilterType';

type Props = {
  filterBy: FilterType,
  setFilterBy: (filterType: FilterType) => void,
  setQuery: (query: string) => void,
  query: string,
  clearFilters: () => void,
};

export const TodoFilter: React.FC<Props> = ({
  filterBy,
  setFilterBy,
  setQuery,
  query,
  clearFilters,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={filterBy}
          onChange={(event) => (
            setFilterBy(event.target.value as FilterType)
          )}
        >
          <option value={FilterType.ALL}>All</option>
          <option value={FilterType.ACTIVE}>Active</option>
          <option value={FilterType.COMPLETED}>Completed</option>
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

      {query && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => clearFilters()}
            aria-label="clear Search button"
          />
        </span>
      )}
    </p>
  </form>
);
