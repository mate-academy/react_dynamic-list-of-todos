import React from 'react';
import { FilterOptions } from '../../types/FilterOptions';

type Props = {
  filterOption: FilterOptions;
  searchQuery: string;
  onSearchQueryChanged: (query: string) => void;
  onFilterOptionSelected: (option: FilterOptions) => void;
};

export const TodoFilter: React.FC<Props> = ({
  filterOption,
  searchQuery,
  onSearchQueryChanged,
  onFilterOptionSelected,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={filterOption}
          onChange={event =>
            onFilterOptionSelected(event.target.value as FilterOptions)
          }
        >
          <option value={FilterOptions.All}>All</option>
          <option value={FilterOptions.Active}>Active</option>
          <option value={FilterOptions.Completed}>Completed</option>
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
        onChange={event => onSearchQueryChanged(event.target.value)}
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
            onClick={() => onSearchQueryChanged('')}
          />
        </span>
      )}
    </p>
  </form>
);
