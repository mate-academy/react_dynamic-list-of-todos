import React, { useEffect, useState } from 'react';
import { TODO_STATUS, TodoStatus } from '../../types/todoFilter';

type Props = {
  filterStatus: TodoStatus;
  onStatusChange: (s: TodoStatus) => void;
  searchQuery: string;
  onQueryChange: (q: string) => void;
};

export const TodoFilter = ({
  filterStatus,
  onStatusChange,
  searchQuery,
  onQueryChange,
}: Props) => {
  const [query, setQuery] = useState(searchQuery);

  useEffect(() => {
    setQuery(searchQuery);
  }, [searchQuery]);

  // eslint-disable-next-line max-len, prettier/prettier
  const handleStatusChange: React.ChangeEventHandler<HTMLSelectElement> = event => onStatusChange(event.target.value as TodoStatus);
  const handleClearQuery = () => {
    setQuery('');
    onQueryChange('');
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      onQueryChange(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, onQueryChange]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterStatus}
            onChange={handleStatusChange}
          >
            <option value={TODO_STATUS.ALL}>All</option>
            <option value={TODO_STATUS.ACTIVE}>Active</option>
            <option value={TODO_STATUS.COMPLETED}>Completed</option>
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

        {query.trim().length > 0 && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClearQuery}
            />
          </span>
        )}
      </p>
    </form>
  );
};
