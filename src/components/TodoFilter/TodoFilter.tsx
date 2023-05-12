import React from 'react';
import { FilterType } from '../../types/FilterType';

type Props = {
  query: string,
  onQueryChange: (query: string) => void,
  filterType: FilterType,
  onFilterChange: (filterType: FilterType) => void,
};

export const TodoFilter = React.memo<Props>((props) => {
  const {
    query,
    onQueryChange,
    filterType,
    onFilterChange,
  } = props;

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterType}
            onChange={(event) => {
              onFilterChange(event.target.value as FilterType);
            }}
          >

            {Object.values(FilterType).map((type) => {
              return (
                <option
                  value={type}
                  key={type}
                >
                  {type.slice(0, 1).toUpperCase() + type.slice(1)}
                </option>
              );
            })}
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
          onChange={(event) => {
            onQueryChange(event.target.value);
          }}
        />

        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span
            className="icon is-right"
            style={{ pointerEvents: 'all' }}
          >
            <button
              aria-label="clear"
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => onQueryChange('')}
            />
          </span>
        )}
      </p>
    </form>
  );
});
