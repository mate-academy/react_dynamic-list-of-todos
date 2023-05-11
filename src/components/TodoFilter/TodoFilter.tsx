import React from 'react';
import { FilteringOptions } from '../../types/FilteringOptions';

type Props = {
  setFilteringOption: (option: FilteringOptions) => void,
  filteringOption: string,
  setSearchQuery: (query: string) => void,
  searchQuery: string,
};

export const TodoFilter: React.FC<Props> = ({
  setFilteringOption,
  filteringOption,
  setSearchQuery,
  searchQuery,
}) => {
  const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilteringOption(event.target.value as FilteringOptions);
  };

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleClearSearchInput = () => {
    setSearchQuery('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filteringOption}
            onChange={handleChangeSelect}
          >
            {Object.entries(FilteringOptions).map(([key, value]) => (
              <option key={value} value={value}>{key}</option>
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
          onChange={handleChangeSearch}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {searchQuery && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClearSearchInput}
            />
          </span>
        )}
      </p>
    </form>
  );
};
