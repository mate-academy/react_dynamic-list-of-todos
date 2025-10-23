import React from 'react';
import { FilteredBy } from '../../types/FilteredBy';

type Props = {
  search: string;
  onSearch: (value: string) => void;
  filteredBy: FilteredBy;
  onFilteredBy: (value: FilteredBy) => void;
};

export const TodoFilter: React.FC<Props> = ({
  search,
  onSearch,
  filteredBy,
  onFilteredBy,
}) => {
  const handleOnSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  const handleOnFilteredBy = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onFilteredBy(event.target.value as FilteredBy);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            value={filteredBy}
            onChange={handleOnFilteredBy}
            data-cy="statusSelect"
          >
            <option value={FilteredBy.All}>All</option>
            <option value={FilteredBy.Active}>Active</option>
            <option value={FilteredBy.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={search}
          onChange={handleOnSearch}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {search && (
            <button
              onClick={() => onSearch('')}
              data-cy="clearSearchButton"
              type="button"
              className="delete"
            />
          )}
        </span>
      </p>
    </form>
  );
};
