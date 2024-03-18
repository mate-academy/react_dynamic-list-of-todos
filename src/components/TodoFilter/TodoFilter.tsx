import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';

type SortingField = 'all' | 'completed' | 'active';

function getPreparedTodos(
  todos: Todo[],
  { sortField, query }: { sortField?: SortingField; query?: string },
) {
  let preparedTodos = [...todos];

  if (sortField) {
    switch (sortField) {
      case 'completed':
        preparedTodos = preparedTodos.filter(todo => todo.completed !== false);
        break;
      case 'active':
        preparedTodos = preparedTodos.filter(todo => todo.completed === false);
        break;
      case 'all':
        break;
      default:
        return preparedTodos;
    }
  }

  if (query) {
    preparedTodos = preparedTodos.filter(todo =>
      todo.title.toLowerCase().includes(query.toLowerCase()),
    );
  }

  return preparedTodos;
}

interface Props {
  todos: Todo[];
  setFilteredTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export const TodoFilter: React.FC<Props> = ({ todos, setFilteredTodos }) => {
  const [sortingField, setSortingField] = useState<SortingField>('all');
  const [query, setQuery] = useState<string>('');

  const changeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setQuery(e.target.value);
  };

  const handleSortingField = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortingField(e.target.value as SortingField);
  };

  const handleClearInput = () => {
    setQuery('');
  };

  useEffect(() => {
    setFilteredTodos(
      getPreparedTodos(todos, { sortField: sortingField, query }),
    );
  }, [todos, sortingField, query, setFilteredTodos]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={sortingField}
            onChange={handleSortingField}
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
          value={query}
          onChange={changeQuery}
          type="text"
          className="input"
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query.length > 0 && (
            // eslint-disable-next-line jsx-a11y/control-has-associated-label
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClearInput}
            />
          )}
        </span>
      </p>
    </form>
  );
};
