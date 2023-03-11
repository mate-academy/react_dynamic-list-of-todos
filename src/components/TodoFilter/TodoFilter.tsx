import React from 'react';
import { FilterType } from '../../types/Filter';

type Props = {
  filterType: FilterType,
  setFilterType: (filterType: FilterType) => void,
  query: string,
  onChangeQuery: (query: string) => void,
};

const filterTypes = ['all', 'active', 'completed'];

export const TodoFilter: React.FC<Props> = (
  {
    filterType,
    setFilterType,
    query,
    onChangeQuery,
  },
) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterType}
            onChange={(event) => {
              setFilterType(event.target.value as FilterType);
            }}
          >
            {filterTypes.map(selectedItem => (
              <option
                value={selectedItem}
                key={selectedItem}
              >
                {selectedItem}
              </option>
            ))}
          </select>
        </span>
      </p>

      <p className="
        control
        is-expanded
        has-icons-left
        has-icons-right"
      >
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={query}
          onChange={(e) => onChangeQuery(e.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => onChangeQuery('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
