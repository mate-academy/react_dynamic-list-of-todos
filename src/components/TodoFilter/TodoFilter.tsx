import React from 'react';
import { FilterType } from '../../types/Filter';
import { FilterParams } from '../../types/FilterParams';

interface Props {
  filterParams: FilterParams,
  setFilterParams: React.Dispatch<React.SetStateAction<FilterParams>>,
}

export const TodoFilter: React.FC <Props> = ({
  filterParams,
  setFilterParams,
}) => {
  const { query, status } = filterParams;

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterParams(params => ({
      ...params,
      status: event.target.value as FilterType,
    }));
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterParams(params => ({
      ...params,
      query: event.target.value,
    }));
  };

  const handleQueryClear = () => {
    setFilterParams(params => ({
      ...params,
      query: '',
    }));
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={handleFilterChange}
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
          onChange={handleQueryChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              aria-label="Clear search"
              type="button"
              className="delete"
              onClick={handleQueryClear}
            />
          </span>
        )}
      </p>
    </form>
  );
};
