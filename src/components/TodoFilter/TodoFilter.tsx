import React, { useState, useEffect, useCallback } from 'react';
import { Todo } from '../../types/Todo';

interface TodoFilterProps {
  todos: Todo[];
  onFilter: (filtered: Todo[]) => void;
}

export const TodoFilter: React.FC<TodoFilterProps> = ({ todos, onFilter }) => {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');

  const applyFilter = useCallback(
    (q: string, st: string) => {
      let filtered = todos;

      // Filter by status
      if (st === 'active') {
        filtered = filtered.filter(todo => !todo.completed);
      } else if (st === 'completed') {
        filtered = filtered.filter(todo => todo.completed);
      }

      // Filter by query
      if (q) {
        filtered = filtered.filter(todo =>
          todo.title.toLowerCase().includes(q.toLowerCase()),
        );
      }

      onFilter(filtered);
    },
    [todos, onFilter],
  );

  useEffect(() => {
    applyFilter(query, status);
  }, [query, status, applyFilter]);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
  };

  const handleClear = () => {
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
              onClick={handleClear}
            />
          </span>
        )}
      </p>
    </form>
  );
};
