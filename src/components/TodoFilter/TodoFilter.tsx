import React from 'react';
import { FilterTypes } from '../../types/filterTypes';

type Props = {
  query: string;
  onQueryChange: (query: string) => void;
  filter: FilterTypes;
  onFilterChange: (filter: FilterTypes) => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  onQueryChange,
  filter,
  onFilterChange,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={filter}
          onChange={e => onFilterChange(e.target.value as FilterTypes)}
        >
          <option value={FilterTypes.All}>All</option>
          <option value={FilterTypes.Active}>Active</option>
          <option value={FilterTypes.Completed}>Completed</option>
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
        onChange={e => onQueryChange(e.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>
      {query && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          <button
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
