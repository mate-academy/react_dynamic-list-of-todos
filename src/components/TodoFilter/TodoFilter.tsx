import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import { Filter } from '../../types/Filter';

type Props = {
  todos: Todo[];
  currentFilter: Filter;
  setFilteredTodos: (todos: Todo[]) => void;
  handleFilterChange: (filter: Filter) => void;
};

export const TodoFilter: React.FC<Props> = ({
  todos,
  currentFilter,
  setFilteredTodos,
  handleFilterChange,
}) => {
  const [query, setQuery] = useState('');

  const filterTodos = (newQuery: string, filter: Filter) => {
    let filteredTodos = todos;

    if (filter === Filter.All) {
      setFilteredTodos(filteredTodos);
    } else if (filter === Filter.Active) {
      filteredTodos = todos.filter(todo => !todo.completed);
      setFilteredTodos(filteredTodos);
    } else if (filter === Filter.Completed) {
      filteredTodos = todos.filter(todo => todo.completed);
      setFilteredTodos(filteredTodos);
    }

    if (query) {
      filteredTodos = filteredTodos.filter(todo =>
        todo.title.toLowerCase().includes(newQuery.toLowerCase()),
      );

      setFilteredTodos(filteredTodos);
    }
  };

  const handleSearchOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;

    setQuery(newQuery);
    filterTodos(newQuery, currentFilter);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={e => {
              handleFilterChange(e.target.value as Filter);
              filterTodos(query, e.target.value as Filter);
            }}
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
              onClick={() => {
                setQuery('');
                setFilteredTodos(todos);
              }}
            />
          </span>
        )}
      </p>
    </form>
  );
};
