import React, { useState, useEffect, useCallback } from 'react';
import { Todo } from '../../types/Todo';

enum Filters {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}

type Props = {
  filteredTodos: Todo[];
  todos: Todo[];
  appliedFilter: Filters;
  setFilteredTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setAppliedFilter: React.Dispatch<React.SetStateAction<Filters>>;
};

export const TodoFilter: React.FC<Props> = ({
  todos,
  appliedFilter,
  filteredTodos,
  setFilteredTodos,
  setAppliedFilter,
}) => {
  const [search, setSearch] = useState('');
  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFilter = event.target.value as Filters;

    setAppliedFilter(selectedFilter);
  };

  const setFilteredTodosCallback = useCallback((updatedFilteredTodos) => {
    setFilteredTodos(updatedFilteredTodos);
  }, [setFilteredTodos]);

  useEffect(() => {
    let updatedFilteredTodos = todos;

    if (appliedFilter === Filters.Active) {
      updatedFilteredTodos = todos.filter((todo) => !todo.completed);
    } else if (appliedFilter === Filters.Completed) {
      updatedFilteredTodos = todos.filter((todo) => todo.completed);
    }

    if (search) {
      updatedFilteredTodos = updatedFilteredTodos.filter(
        (todo) => todo.title.toLowerCase().includes(search.toLowerCase()),
      );
    }

    setFilteredTodosCallback(updatedFilteredTodos);
  }, [appliedFilter, todos, search, setFilteredTodosCallback]);

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = event.target.value;

    setSearch(newSearch);
    let updatedFilteredTodos = todos;

    if (appliedFilter === Filters.Active) {
      updatedFilteredTodos = todos.filter((todo) => !todo.completed);
    } else if (appliedFilter === Filters.Completed) {
      updatedFilteredTodos = todos.filter((todo) => todo.completed);
    }

    if (newSearch) {
      updatedFilteredTodos = updatedFilteredTodos.filter(
        (todo) => todo.title.toLowerCase().includes(newSearch.toLowerCase()),
      );
    }

    setFilteredTodos(updatedFilteredTodos);
  };

  const handleDelete = () => {
    setSearch('');
    setFilteredTodos(filteredTodos);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleFilterChange}
          >
            <option value={Filters.All}>All</option>
            <option value={Filters.Active}>Active</option>
            <option value={Filters.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={search}
          onChange={handleChangeInput}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {search && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              aria-label="Clear Search"
              onClick={handleDelete}
            />
          )}
        </span>
      </p>
    </form>
  );
};
