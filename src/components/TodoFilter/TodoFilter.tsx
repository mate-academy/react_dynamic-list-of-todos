import { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';

type TodoFilterProps = {
  todos: Todo[];
  onFilterChange: (filteredTodo: Todo[]) => void;
};

export const TodoFilter: React.FC<TodoFilterProps> = ({
  todos,
  onFilterChange,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [status, setStatus] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    const searchTodo = searchQuery.trim().toLowerCase();
    const filteredTodo = todos.filter(todo => {
      const matchesStatus =
        status === 'all' ||
        (status === 'active' && !todo.completed) ||
        (status === 'completed' && todo.completed);

      const matchesQuery = todo.title.toLowerCase().includes(searchTodo);

      return matchesStatus && matchesQuery;
    });

    onFilterChange(filteredTodo);
  }, [searchQuery, todos, status, onFilterChange]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={e =>
              setStatus(e.target.value as 'all' | 'active' | 'completed')
            }
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
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {searchQuery && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setSearchQuery('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
