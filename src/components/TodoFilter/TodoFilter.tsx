import React from 'react';
import { FilterBy } from '../../types/Filter';

type Props = {
  query: string;
  onQueryChange: (query: string) => void;
  filterBy: FilterBy;
  setFilterBy: (filterBy: FilterBy) => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  onQueryChange,
  filterBy,
  setFilterBy,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={filterBy}
          onChange={({ target }) => {
            setFilterBy(target.value as FilterBy);
          }}
        >
          <option value={FilterBy.ALL}>All</option>
          <option value={FilterBy.ACTIVE}>Active</option>
          <option value={FilterBy.COMPLETED}>Completed</option>
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
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            aria-label="Delete"
            onClick={() => {
              onQueryChange('');
            }}
          />
        </span>
      )}
    </p>
  </form>
);
