import React, { useCallback, useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todoList: Todo[];
  onFilterChange: (filteredTodos: Todo[]) => void;
};

export const TodoFilter: React.FC<Props> = ({ todoList, onFilterChange }) => {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');

  const filterTodos = useCallback(() => {
    let filteredTodos = [...todoList];

    if (status === 'active') {
      filteredTodos = filteredTodos.filter(todo => !todo.completed);
    } else if (status === 'completed') {
      filteredTodos = filteredTodos.filter(todo => todo.completed);
    }

    if (query) {
      filteredTodos = filteredTodos.filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    onFilterChange(filteredTodos);
  }, [query, status, todoList, onFilterChange]);

  useEffect(() => {
    filterTodos();
  }, [query, status, todoList]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value);
  };

  const handleClearSearch = () => {
    setQuery('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={handleStatusChange}
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
          onChange={handleInputChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query !== '' && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClearSearch}
            />
          </span>
        )}
      </p>
    </form>
  );
};
