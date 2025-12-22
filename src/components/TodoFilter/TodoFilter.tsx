import React, { useState, useEffect } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  onFilter: (filteredTodos: Todo[]) => void;
};

export const TodoFilter: React.FC<Props> = ({ todos, onFilter }) => {
  const [status, setStatus] = useState<'all' | 'active' | 'completed'>('all');
  const [search, setSearch] = useState('');

  // Виклик фільтрування при зміні todos або статусу/пошуку
  useEffect(() => {
    let filtered = [...todos];

    if (status === 'active') {
      filtered = filtered.filter(t => !t.completed);
    }

    if (status === 'completed') {
      filtered = filtered.filter(t => t.completed);
    }

    if (search.trim()) {
      filtered = filtered.filter(t =>
        t.title.toLowerCase().includes(search.trim().toLowerCase()),
      );
    }

    onFilter(filtered);
  }, [todos, status, search, onFilter]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            value={status}
            onChange={e =>
              setStatus(e.target.value as 'all' | 'active' | 'completed')
            }
            data-cy="statusSelect"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          type="text"
          className="input"
          placeholder="Search..."
          value={search}
          data-cy="searchInput"
          onChange={e => setSearch(e.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>
        {search && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              type="button"
              className="delete"
              data-cy="clearSearchButton"
              onClick={() => setSearch('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
