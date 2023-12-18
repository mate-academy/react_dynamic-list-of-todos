import React from 'react';
import { FilterBy } from '../../types/FilterBy';

interface Props {
  searchQuery: string,
  // filter: FilterBy
  onQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleClearQuery: () => void
  onFilterSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

export const TodoFilter: React.FC<Props> = ({
  searchQuery,
  // filter,
  onQueryChange,
  handleClearQuery,
  onFilterSelect,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          onChange={event => onFilterSelect(event)}
          defaultValue={FilterBy.all}
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
        value={searchQuery}
        onChange={event => onQueryChange(event)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        {!!searchQuery.length
          && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClearQuery}
              aria-label="Clear Search"
            />
          )}
      </span>
    </p>
  </form>
);
