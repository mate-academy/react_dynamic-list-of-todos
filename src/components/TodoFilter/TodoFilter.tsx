/* eslint-disable jsx-a11y/control-has-associated-label */
import { useCallback, useEffect, useState } from 'react';
import debounce from 'lodash/debounce';
import { Todo } from '../../types/Todo';
import { TodoStatus } from '../../types/TodoStatus';

type Props = {
  todos: Todo[];
  setPreparedTodos: (todos: Todo[]) => void;
};

export const TodoFilter:React.FC<Props> = ({
  todos,
  setPreparedTodos,
}) => {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [status, setStatus] = useState('all');

  const applyQuery = useCallback(
    debounce(setDebouncedQuery, 500),
    [],
  );

  const prepareTodos = (todosToFilter: Todo[]) => {
    let filteredTodos = todosToFilter;

    if (debouncedQuery) {
      filteredTodos = todosToFilter.filter(
        todo => todo.title.toLowerCase().includes(debouncedQuery.toLowerCase()),
      );
    }

    switch (status) {
      case TodoStatus.All:
        break;
      case TodoStatus.Completed:
        filteredTodos = filteredTodos.filter(todo => todo.completed);
        break;
      case TodoStatus.Active:
        filteredTodos = filteredTodos.filter(todo => !todo.completed);
        break;
      default:
        break;
    }

    return filteredTodos;
  };

  useEffect(() => {
    setPreparedTodos(prepareTodos(todos));
  }, [status, debouncedQuery, todos]);

  const handleQueryChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setQuery(event.target.value);
    applyQuery(event.target.value);
  };

  const handleSelectClick = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setStatus(event.target.value);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            name="status"
            data-cy="statusSelect"
            value={status}
            onChange={handleSelectClick}
          >
            <option value={TodoStatus.All}>All</option>
            <option value={TodoStatus.Active}>Active</option>
            <option value={TodoStatus.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          name="title"
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
          <span
            className="icon is-right"
            style={{ pointerEvents: 'all' }}
          >
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => {
                setQuery('');
                setPreparedTodos(todos);
              }}
            />
          </span>
        )}
      </p>
    </form>
  );
};
