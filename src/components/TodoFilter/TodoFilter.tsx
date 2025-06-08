import React from 'react';
import { FilterType } from '../../enums/FilterType';

type Props = {
  filterType: FilterType;
  query: string;
  setFilterType: (filterType: FilterType) => void;
  setQuery: (query: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  filterType,
  query,
  setFilterType,
  setQuery,
}) => {
  const onStatusSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterType(event.target.value as FilterType);
  };

  const onQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const onFiltersReset = () => {
    setFilterType(FilterType.All);
    setQuery('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterType}
            onChange={onStatusSelect}
          >
            <option value={FilterType.All}>All</option>
            <option value={FilterType.Active}>Active</option>
            <option value={FilterType.Completed}>Completed</option>
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
          onChange={onQueryChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query !== '' && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={onFiltersReset}
            />
          )}
        </span>
      </p>
    </form>
  );
};
