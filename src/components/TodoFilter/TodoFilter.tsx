import React, { useState, useEffect } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  setFilteredTodos: (todos: Todo[]) => void;
};

export const TodoFilter: React.FC<Props> = ({ todos, setFilteredTodos }) => {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<'all' | 'active' | 'completed'>('all');

  function handleSelectChoice(event: React.ChangeEvent<HTMLSelectElement>) {
    setStatus(event.target.value as 'all' | 'active' | 'completed');
  }

  useEffect(() => {
    let filtered = todos;

    if (status === 'active') {
      filtered = todos.filter(todo => !todo.completed);
    } else if (status === 'completed') {
      filtered = todos.filter(todo => todo.completed);
    }

    if (query) {
      filtered = filtered.filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    setFilteredTodos(filtered);
  }, [todos, query, status, setFilteredTodos]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={handleSelectChoice}
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
          onChange={event => setQuery(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setQuery('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
