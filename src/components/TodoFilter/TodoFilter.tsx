import React from 'react';
import { Filter } from '../../types/Filter';

interface Props {
  searchQuery: string;
  todosFilter: string;
  onSearchQueryChange: (searchQuery: string) => void;
  onTodosFilterChange: (todosFilter: Filter) => void;
}
export const TodoFilter: React.FC<Props> = ({
  searchQuery,
  todosFilter,
  onSearchQueryChange,
  onTodosFilterChange,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={todosFilter}
          onChange={(event) => {
            onTodosFilterChange(event.target.value as Filter);
          }}
        >
          <option value={Filter.ALL}>All</option>
          <option value={Filter.ACTIVE}>Active</option>
          <option value={Filter.COMPLETED}>Completed</option>
        </select>
      </span>
    </p>

    <p className="control is-expanded has-icons-left has-icons-right">
      <input
        data-cy="searchInput"
        type="text"
        className="input"
        placeholder="Search..."
        value={searchQuery}
        onChange={(event) => {
          onSearchQueryChange(event.target.value);
        }}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {searchQuery && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            aria-label="Clear search button"
            onClick={() => {
              onSearchQueryChange('');
            }}
          />
        </span>
      )}
    </p>
  </form>
);
