import React from 'react';
import { FilterParams } from '../../utils/FilterParams';
import { Filters } from '../../types/Filters';

type Props = {
  filterParam: Filters,
  onFilterChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onReset: () => void,
};

export const TodoFilter: React.FC<Props> = ({
  filterParam,
  onFilterChange,
  onSearch,
  onReset,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            defaultValue={filterParam.select}
            onChange={onFilterChange}
            className="is-capitalized"
          >
            {(Object.values(FilterParams))
              .map((value) => (
                <option
                  value={value}
                  key={value}
                  className="is-capitalized"
                >
                  {value}
                </option>
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
          value={filterParam.query}
          onChange={onSearch}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>
        {filterParam.query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={onReset}
              aria-label="clearSearchButton"
            />
          </span>
        )}
      </p>
    </form>
  );
};
