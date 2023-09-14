import React from 'react';

import { FilterType, FilterOptions } from '../../types/FilterType';

type Props = {
  filter: FilterType,
  handleSetFilter: (event:
  React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void,
  handleClearInput: () => void,
};

export const TodoFilter: React.FC<Props> = ({
  filter,
  handleSetFilter,
  handleClearInput,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          name="filterByStatus"
          value={filter.filterByStatus}
          onChange={(e) => handleSetFilter(e)}
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
        name="filterByTitle"
        className="input"
        placeholder="Search..."
        value={filter.filterByTitle}
        onChange={(e) => handleSetFilter(e)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {filter.filterByTitle && (
          /* eslint-disable-next-line jsx-a11y/control-has-associated-label */
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={handleClearInput}
          />
        )}
      </span>
    </p>
  </form>
);
