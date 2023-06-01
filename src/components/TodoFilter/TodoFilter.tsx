import { ChangeEvent, useState } from 'react';
import { Todo } from '../../types/Todo';

interface TodoFilterProps {
  filterTodos: (newTodos: Todo[]) => void;
  todos: Todo[],
}

export const TodoFilter = ({ filterTodos, todos }: TodoFilterProps) => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [query, setQuery] = useState('');

  const filteredTodos = (filter: string, newQuery: string) => {
    return todos.filter(todo => {
      const lowerQuery = newQuery.toLowerCase();
      const hasTitle = todo.title.toLowerCase().includes(lowerQuery);

      if (!hasTitle) {
        return false;
      }

      switch (filter) {
        case 'all':
          return true;
        case 'active':
          return !todo.completed;
        case 'completed':
          return todo.completed;
        default:
          throw new Error('wrong filter selected');
      }
    });
  };

  const handleReset = () => {
    setQuery('');
    filterTodos(filteredTodos(selectedFilter, ''));
  };

  const handleSelectedFilter = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(String(event.target.value));
    filterTodos(filteredTodos(String(event.target.value), query));
  };

  const handleFilter = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(String(event.target.value));
    filterTodos(filteredTodos(selectedFilter, String(event.target.value)));
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectedFilter}
            onChange={handleSelectedFilter}
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
          onChange={(event) => handleFilter(event)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query !== '' && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => handleReset()}
            />
          </span>
        )}
      </p>
    </form>
  );
};
