import React from 'react';

import { FilterBy } from '../../types/FilterBy';

const filterByOptions = Object.values(FilterBy);

const filterByOptionsNames = {
  [FilterBy.All]: 'All',
  [FilterBy.Active]: 'Active',
  [FilterBy.Completed]: 'Completed',
};

type Props = {
  query: string;
  onQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onQueryReset: () => void;
  filterBy: string;
  onFilterChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  onQueryChange,
  onQueryReset,
  filterBy,
  onFilterChange,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={filterBy}
          onChange={onFilterChange}
        >
          {filterByOptions.map(filterByOption => (
            <option
              value={filterByOption}
              selected={filterBy === filterByOption}
            >
              {filterByOptionsNames[filterByOption]}
            </option>
          ))}
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

      {query && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={onQueryReset}
          />
        </span>
      )}
    </p>
  </form>
);
