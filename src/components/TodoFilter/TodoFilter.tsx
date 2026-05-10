import React, { useEffect } from 'react';
import { useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  onFilter: (todos: Todo[]) => void;
};

export const TodoFilter: React.FC<Props> = ({ todos, onFilter }) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');

  useEffect(() => {
    let filtered = [...todos];

    if (category === 'active') {
      filtered = filtered.filter(todo => !todo.completed);
    }

    if (category === 'completed') {
      filtered = filtered.filter(todo => todo.completed);
    }

    if (query.trim()) {
      filtered = filtered.filter(todo =>
        todo.title.toLowerCase().includes(query.trim().toLowerCase()),
      );
    }

    onFilter(filtered);
  }, [category, query, todos, onFilter]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={category}
            onChange={event => setCategory(event.target.value)}
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
          value={query}
          onChange={event => {
            setQuery(event.currentTarget.value);
          }}
          className="input"
          placeholder="Search..."
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
              onClick={() => setQuery('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
