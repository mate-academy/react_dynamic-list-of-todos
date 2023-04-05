import React, { useEffect } from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  query: string,
  setQuery: React.Dispatch<React.SetStateAction<string>>,
  filterType: string,
  setFilterType: React.Dispatch<React.SetStateAction<string>>,
}

export const TodoFilter: React.FC<Props> = ({
  todos,
  setTodos,
  query,
  setQuery,
  filterType,
  setFilterType,
}) => {
  useEffect(() => {
    setTodos(todos);
  }, [query, filterType]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterType}
            onChange={(event) => setFilterType(event.target.value)}
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
          onChange={(event) => setQuery(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              aria-label="clear"
              onClick={() => setQuery('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
