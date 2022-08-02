import React from 'react';

enum FilterType {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

type Props = {
  query: string;
  onSetQuery: (query: string) => void;
  filterValue: FilterType,
  onSetFilterValue: (value: FilterType) => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  onSetQuery,
  filterValue,
  onSetFilterValue,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={filterValue}
          onChange={({ target }) => {
            onSetFilterValue(target.value as FilterType);
          }}
        >
          <option value={FilterType.All}>All</option>
          <option value={FilterType.Active}>Active</option>
          <option value={FilterType.Completed}>Completed</option>
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
        onChange={(event) => onSetQuery(event.target.value)}
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
            onClick={() => onSetQuery('')}
          />
        </span>
      )}
    </p>
  </form>
);
