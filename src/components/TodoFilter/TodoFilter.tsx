import React from 'react';

import { FilterType, FilterOptions } from '../../types/FilterType';

type Props = {
  filter: FilterType,
  onFilterSet: (event:
  React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void,
  onInputClear: () => void,
};

export const TodoFilter: React.FC<Props> = ({
  filter,
  onFilterSet,
  onInputClear,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          name="filterByStatus"
          value={filter.filterByStatus}
          onChange={onFilterSet}
        >
          {(Object.keys(FilterOptions) as (keyof typeof FilterOptions)[])
            .map((key) => (
              <option value={FilterOptions[key]} key={key}>
                {key}
              </option>
            ))}
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
        onChange={onFilterSet}
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
            onClick={onInputClear}
          />
        )}
      </span>
    </p>
  </form>
);
