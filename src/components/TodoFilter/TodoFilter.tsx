import React from 'react';
import { SortType } from '../../types/SortType';

interface Props {
  sortType: SortType;
  onSortTodos: (event: string) => void;
  onQuery: (event: string) => void;
  query: string;
  onClear: () => void;
}

export const TodoFilter: React.FC<Props> = ({
  sortType,
  onSortTodos,
  onQuery,
  query,
  onClear,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={sortType}
          onChange={(event) => onSortTodos(event.target.value)}
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
        onChange={(event) => onQuery(event.target.value)}
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
            aria-label="clearSearch"
            onClick={onClear}
          />
        </span>
      )}
    </p>
  </form>
);
