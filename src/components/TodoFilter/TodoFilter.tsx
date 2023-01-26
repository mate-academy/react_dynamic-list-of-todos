import React from 'react';
import { FilterType } from '../../types/FilterType';

type Props = {
  selectedFilter: string;
  selectFilterType: (selectedFilter: FilterType) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};

export const TodoFilter: React.FC<Props> = React.memo(
  ({
    selectedFilter,
    selectFilterType,
    searchQuery,
    setSearchQuery,
  }) => (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectedFilter}
            onChange={(event) => {
              selectFilterType(event.currentTarget.value as FilterType);
            }}
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
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.currentTarget.value)}
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
              onClick={() => {
                setSearchQuery('');
                selectFilterType(FilterType.ALL);
              }}
            />
          </span>
        )}
      </p>
    </form>
  ),
);
