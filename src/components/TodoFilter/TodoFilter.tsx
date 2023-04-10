import React from 'react';

import { FilterBy } from '../../Types/FilterBy';
import { FilterByOptionsNames } from '../../Types/FilterByOptionsNames';

const filterByOptions = Object.values(FilterBy);

const filterByOptionsNames: FilterByOptionsNames = filterByOptions.reduce(
  (names, filterByOption) => {
    const filterByOptionSplit = filterByOption.split('');
    const nameFirstLetterUpperCased = filterByOptionSplit[0].toUpperCase();
    const nameRemainingPart = filterByOption.slice(1);
    const name = nameFirstLetterUpperCased + nameRemainingPart;

    return {
      ...names,
      [filterByOption]: name,
    };
  },
  {} as FilterByOptionsNames,
);

type Props = {
  query: string;
  filterBy: string;
  onQueryChange: (newQuery: string) => void;
  onFilterChange: (newFilterBy: FilterBy) => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  filterBy,
  onQueryChange,
  onFilterChange,
}) => {
  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange(event.currentTarget.value as FilterBy);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.currentTarget.value);
  };

  const handleQueryReset = () => {
    onQueryChange('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterBy}
            onChange={handleFilterChange}
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
          onChange={handleQueryChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              aria-label="Reset"
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleQueryReset}
            />
          </span>
        )}
      </p>
    </form>
  );
};
