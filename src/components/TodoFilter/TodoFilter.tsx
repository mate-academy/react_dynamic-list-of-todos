import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
};

export const TodoFilter: React.FC<Props> = ({ todos, setTodos }) => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [query, setQuery] = useState('');

  const handleDropdown = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(event.currentTarget.value);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.currentTarget.value);
  };

  const handleClearButton = () => {
    setQuery('');
    setStatusFilter('all');
  };

  useEffect(() => {
    let filteredTodos = [...todos];

    if (query) {
      filteredTodos = todos.filter(todo =>
        todo.title.toLowerCase().includes(query.trim().toLowerCase()),
      );
    }

    if (statusFilter === 'active') {
      filteredTodos = filteredTodos.filter(todo => !todo.completed);
    } else if (statusFilter === 'completed') {
      filteredTodos = filteredTodos.filter(todo => todo.completed);
    }

    setTodos(filteredTodos);
  }, [query, statusFilter, todos, setTodos]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={statusFilter}
            onChange={handleDropdown}
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
          onChange={handleQueryChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {query && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClearButton}
            />
          )}
        </span>
      </p>
    </form>
  );
};
