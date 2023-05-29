import React from 'react';
import { SelectFilter } from '../../types/SelectFilter';

type Props = {
  query: string,
  onChangedQuery: (event: React.ChangeEvent<HTMLInputElement>) => void;
  resetQuery: () => void;
  selectFilter: SelectFilter;
  setSelectFilter: (selectFilter: SelectFilter) => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  onChangedQuery,
  resetQuery,
  selectFilter,
  setSelectFilter,
}) => {
  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setSelectFilter(value as SelectFilter);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectFilter}
            onChange={handleSelect}
          >
            <option value={SelectFilter.All}>All</option>
            <option value={SelectFilter.Active}>Active</option>
            <option value={SelectFilter.Completed}>Completed</option>
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
          onChange={onChangedQuery}
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
              onClick={resetQuery}
              aria-label="Clear"
            />
          </span>
        )}
      </p>
    </form>
  );
};
