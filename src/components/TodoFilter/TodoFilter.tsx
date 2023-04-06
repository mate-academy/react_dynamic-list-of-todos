import React, { useState } from 'react';

enum TodoTypeFilter {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

export const TodoFilter = React.memo(() => {
  const [
    todoFilter,
    setTodoFilter,
  ] = useState<TodoTypeFilter>(TodoTypeFilter.ALL);
  const [queryFilter, setQueryFilter] = useState('');

  // console.log('todofilter:', todoFilter);
  // console.log('queryFilter:', queryFilter);

  const handleSelectFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTodoFilter(event.target.value as TodoTypeFilter);
  };

  const handleQueryFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const titleQuery = event.target.value;

    setQueryFilter(titleQuery);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={todoFilter}
            onChange={handleSelectFilter}
          >
            <option value={TodoTypeFilter.ALL}>All</option>
            <option value={TodoTypeFilter.ACTIVE}>Active</option>
            <option value={TodoTypeFilter.COMPLETED}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={queryFilter}
          onChange={handleQueryFilter}
        />

        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
          />
        </span>
      </p>
    </form>
  );
});
