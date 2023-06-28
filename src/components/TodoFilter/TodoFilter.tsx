import React from 'react';
import { TodoStatus } from '../../types/TodoStatus';

type Props = {
  query: string,
  status: TodoStatus,
  onInputQuery: (value: string) => void,
  onSelectStatus: (todoStatus: TodoStatus) => void,
};

export const TodoFilter: React.FC<Props> = ({
  query,
  status,
  onInputQuery,
  onSelectStatus,
}) => {
  const handleQueryChange = ((event: React.ChangeEvent<HTMLInputElement>) => (
    onInputQuery(event.target.value)
  ));

  const handleStatusChange = ((event: React.ChangeEvent<HTMLSelectElement>) => (
    onSelectStatus(event.target.value as TodoStatus)
  ));

  const handleClearFilters = (() => {
    onInputQuery('');
  });

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={handleStatusChange}
          >
            <option value={TodoStatus.All}>All</option>
            <option value={TodoStatus.Active}>Active</option>
            <option value={TodoStatus.Completed}>Completed</option>
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
          onChange={handleQueryChange}
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
              onClick={handleClearFilters}
            />
          </span>
        )}

      </p>
    </form>
  );
};
