import React from 'react';
import { TodoStatus } from '../../types/TodoStatus';

interface Props {
  filterBy: TodoStatus;
  query: string;
  onFilterChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClearQuery: () => void;
}

export const TodoFilter: React.FC<Props> = ({
  filterBy,
  query,
  onFilterChange,
  onQueryChange,
  onClearQuery,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterBy}
            onChange={onFilterChange}
          >
            <option value={TodoStatus.all}>All</option>
            <option value={TodoStatus.active}>Active</option>
            <option value={TodoStatus.completed}>Completed</option>
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
          onChange={onQueryChange}
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
              onClick={onClearQuery}
            />
          </span>
        )}
      </p>
    </form>
  );
};
