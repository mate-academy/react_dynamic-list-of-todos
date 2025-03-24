import React from 'react';
import { FilterBy } from '../../types/filterBy';

type Props = {
  setFilterBy: (filterBy: FilterBy) => void;
  setSearchQuery: (query: string) => void;
  filterByValue: FilterBy;
  searchQueryValue: string;
};

export const TodoFilter: React.FC<Props> = ({
  setFilterBy,
  setSearchQuery,
  filterByValue,
  searchQueryValue,
}) => {
  const handleSelectOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterBy(event.target.value as FilterBy);
  };

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const clearSearchInput = () => {
    setSearchQuery('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleSelectOption}
            value={filterByValue}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={searchQueryValue}
          onChange={handleSearchInput}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {searchQueryValue && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={clearSearchInput}
            />
          </span>
        )}
      </p>
    </form>
  );
};
