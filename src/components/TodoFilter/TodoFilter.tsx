import React from 'react';
import { FilterStatus } from '../../types/FilterStatus';

type Filter = {
  filterStatus: string;
  onChangeFilter: (status: FilterStatus) => void;
  query: string;
  onChangeQuery: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClearSearch: () => void;
};

export const TodoFilter: React.FC<Filter> = ({
  onChangeFilter,
  filterStatus,
  query,
  onChangeQuery,
  onClearSearch,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const status = event.target.value as FilterStatus;

    onChangeFilter(status);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterStatus}
            onChange={handleChange}
          >
            <option value={FilterStatus.ALL}>All</option>
            <option value={FilterStatus.ACTIVE}>Active</option>
            <option value={FilterStatus.COMPLETED}>Completed</option>
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
          onChange={onChangeQuery}
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
              aria-label="Clear search"
              onClick={onClearSearch}
            />
          </span>
        )}
      </p>
    </form>
  );
};
