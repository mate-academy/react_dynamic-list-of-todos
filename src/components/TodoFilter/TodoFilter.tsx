import React from 'react';

export enum FilterParams {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

interface Filter {
  selectFilter: string,
  query: string,
}

type Props = {
  filterParam: Filter,
  onFilterChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void,
};

export const TodoFilter: React.FC<Props> = ({
  filterParam,
  onFilterChange,
  onSearch,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            defaultValue={filterParam.selectFilter}
            onChange={onFilterChange}
          >
            <option value={FilterParams.All}>All</option>
            <option value={FilterParams.Active}>Active</option>
            <option value={FilterParams.Completed}>Completed</option>
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

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
          />
        </span>
      </p>
    </form>
  );
};
