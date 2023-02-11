import React from 'react';

import { FilterOptions } from '../../enums/FilterOptions';

type Props = {
  selectedFilter: FilterOptions;
  searchQuery: string;
  onSelectedFilterChange: (newFilter: FilterOptions) => void;
  onSearchQueryChange: (newQuery: string) => void;
};

const filterOptions = Object.values(FilterOptions);

export const TodoFilter: React.FC<Props> = React.memo(
  ({
    selectedFilter,
    searchQuery,
    onSelectedFilterChange,
    onSearchQueryChange,
  }) => {
    const clearSearchBar = () => onSearchQueryChange('');

    return (
      <form className="field has-addons">
        <p className="control">
          <span className="select">
            <select
              data-cy="statusSelect"
              value={selectedFilter}
              onChange={(event) => {
                onSelectedFilterChange(event.target.value as FilterOptions);
              }}
            >
              {filterOptions.map((filterOption) => (
                <option key={filterOption} value={filterOption}>
                  {filterOption[0].toUpperCase() + filterOption.slice(1)}
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
            value={searchQuery}
            onChange={(event) => onSearchQueryChange(event.target.value)}
          />
          <span className="icon is-left">
            <i className="fas fa-magnifying-glass" />
          </span>

          {searchQuery.length > 0 && (
            <span
              className="icon is-right"
              style={{ pointerEvents: 'all' }}
            >
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={clearSearchBar}
                aria-label="clear search bar"
              />
            </span>
          )}
        </p>
      </form>
    );
  },
);
