import { useState, useEffect, useCallback } from 'react';
import { Todo } from '../../types/Todo';

interface TodoFilterProps {
  todos: Todo[];
  handleFilterChange: (filteredTodos: Todo[]) => void;
}

export enum FilterOptions {
  ALL = 'all',
  COMPLETED = 'completed',
  ACTIVE = 'active',
}

export const TodoFilter: React.FC<TodoFilterProps> = ({
  todos,
  handleFilterChange,
}) => {
  const [filter, setFilter] = useState<FilterOptions>(FilterOptions.ALL);
  const [query, setQuery] = useState('');

  const handleFilterTodos = () => {
    let filteredTodos = todos.filter(todo => {
      switch (filter) {
        case FilterOptions.ACTIVE:
          return !todo.completed;
        case FilterOptions.COMPLETED:
          return todo.completed;
        default:
          return true;
      }
    });

    if (query) {
      filteredTodos = filteredTodos.filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    handleFilterChange(filteredTodos);
  };

  useEffect(() => {
    handleFilterTodos();
  }, [filter, query, todos]);

  const handleChangeFilter = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setFilter(event.target.value as FilterOptions);
    },
    [],
  );

  const handleChangeQuery = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value);
    },
    [],
  );

  const handleClearQuery = useCallback(() => {
    setQuery('');
  }, []);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter}
            onChange={handleChangeFilter}
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
          onChange={handleChangeQuery}
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
              onClick={handleClearQuery}
            />
          </span>
        )}
      </p>
    </form>
  );
};
