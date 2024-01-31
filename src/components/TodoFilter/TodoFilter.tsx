import React, { useContext } from 'react';
import { Status } from '../../types/Status';
import { TodosContext } from '../context/TodosContext';

export const TodoFilter: React.FC = () => {
  const {
    setFilterTodos,
    query,
    setQuery,
  } = useContext(TodosContext);

  const {
    all,
    active,
    completed,
  } = Status;

  const handleFilter = (eventFilter: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterTodos(eventFilter.target.value as Status);
  };

  const handleQuery = (eventQuery: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(eventQuery.target.value);
  };

  const reset = () => {
    setQuery('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleFilter}
          >
            <option value={all}>All</option>
            <option value={active}>Active</option>
            <option value={completed}>Completed</option>
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
          onChange={handleQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {!!query.length && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={reset}
            />
          </span>
        )}
      </p>
    </form>
  );
};
