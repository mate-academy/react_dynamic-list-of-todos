import React from 'react';

export enum FilterType {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

type Props = {
  query: string,
  onChangeQuery: (event: React.ChangeEvent) => void,
  resetQuery: () => void,
  filterType: FilterType,
  setFilterType: (event: FilterType) => void,
};

export const TodoFilter: React.FC<Props> = ({
  query,
  onChangeQuery,
  resetQuery,
  filterType,
  setFilterType,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={filterType}
          onChange={
            (event) => setFilterType(event.currentTarget.value as FilterType)
          }
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
        value={query}
        onChange={onChangeQuery}
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
            onClick={resetQuery}
          />
        </span>
      )}
    </p>
  </form>
);
