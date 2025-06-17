import type { Todo } from '../../types/Todo';
import { useState, useEffect } from 'react';

type FilterProps = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

export const TodoFilter = ({ todos, setTodos }: FilterProps) => {
  const [status, setStatus] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    let filtered = todos;

    if (status === 'active') {
      filtered = filtered.filter(todo => !todo.completed);
    } else if (status === 'completed') {
      filtered = filtered.filter(todo => todo.completed);
    }

    if (search.trim() !== '') {
      filtered = filtered.filter(todo =>
        todo.title.toLowerCase().includes(search.toLowerCase()),
      );
    }

    setTodos(filtered);
  }, [status, search, todos, setTodos]);

  return (
    <form className="field has-addons" onSubmit={e => e.preventDefault()}>
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={e => setStatus(e.target.value)}
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
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {search && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setSearch('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
