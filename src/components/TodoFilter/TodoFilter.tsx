/* eslint-disable no-console */

import { useContext, useState, useEffect } from 'react';
import { TodoContext } from '../TodoContext/TodoContext';

export const TodoFilter = () => {
  const { setFilteredTodos, todos } = useContext(TodoContext);

  const [filterType, setFilterType] = useState('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!todos) {
      return;
    }

    const isExactSearch = query.startsWith('"') && query.endsWith('"');
    const cleanQuery = query.replace(/^"|"$/g, '').trim().toLowerCase();

    let result = todos.filter(({ title }) => {
      if (!cleanQuery) {
        return true;
      }

      const titleLower = title.toLowerCase();

      if (isExactSearch) {
        return titleLower === cleanQuery;
      }

      return titleLower.includes(cleanQuery);
    });

    switch (filterType) {
      case 'active':
        result = result.filter(todo => !todo.completed);
        break;
      case 'completed':
        result = result.filter(todo => todo.completed);
        break;
      default:
        break;
    }

    setFilteredTodos(result);
  }, [todos, query, filterType, setFilteredTodos]);

  const handleSelectOnChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setFilterType(event.target.value);
  };

  const handleSearchOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const clearSearchInput = () => setQuery('');

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterType}
            onChange={handleSelectOnChange}
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
          onChange={handleSearchOnChange}
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
              onClick={clearSearchInput}
            />
          </span>
        )}
      </p>
    </form>
  );
};
