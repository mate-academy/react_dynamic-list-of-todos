import React, { useState, useEffect } from 'react';
import { Todo } from '../../types/Todo';
// import { getTodos } from '../../api';

enum Values {
  all = 'all',
  active = 'active',
  completed = 'completed',
}

type Props = {
  todos: Todo[];
  onSelected: (todos: Todo[]) => void;
};

export const TodoFilter: React.FC<Props> = ({ todos, onSelected }) => {
  const [status, setStatus] = useState<Values>(Values.all);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let filtered = [...todos];

    if (status === Values.active) {
      filtered = filtered.filter(todo => !todo.completed);
    }

    if (status === Values.completed) {
      filtered = filtered.filter(todo => todo.completed);
    }

    if (query.trim()) {
      filtered = filtered.filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    onSelected(filtered);
  }, [todos, status, query, onSelected]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={e => setStatus(e.target.value as Values)}
          >
            <option value={Values.all}>All</option>
            <option value={Values.active}>Active</option>
            <option value={Values.completed}>Completed</option>
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
          onChange={e => setQuery(e.target.value)}
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
