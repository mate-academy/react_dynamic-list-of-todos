import React from 'react';
import { FilterBy } from '../../types/Todo';

type Props = {
  filterBy: FilterBy;
  onFilterChange: (selectedOption: FilterBy) => void;
  query: string;
  setQuery: (value: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  filterBy,
  onFilterChange,
  query,
  setQuery,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          value={filterBy}
          onChange={(event) => onFilterChange(event.target.value as FilterBy)}
          data-cy="statusSelect"
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
        onChange={event => setQuery(event.target.value)}
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
            onClick={() => setQuery('')}
          />
        </span>
      )}
    </p>
  </form>
);
