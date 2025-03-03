import { useCallback, useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[] | null;
  setCurrentTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

export const TodoFilter: React.FC<Props> = ({ todos, setCurrentTodos }) => {
  const [showQueryCancel, setShowQueryCancel] = useState(false);
  const [queryValue, setQueryValue] = useState('');
  const [filterValue, setFilterValue] = useState('all');

  const todosFilter = useCallback(
    (query: string, filter: string) => {
      let todosFiltered: Todo[] = todos ? [...todos] : [];

      if (filter === 'completed') {
        todosFiltered = todosFiltered.filter(todo => todo.completed);
      } else if (filter === 'active') {
        todosFiltered = todosFiltered.filter(todo => !todo.completed);
      }

      if (query) {
        todosFiltered = todosFiltered.filter(todo =>
          todo.title.toLowerCase().includes(query.toLowerCase()),
        );
      }

      return todosFiltered;
    },
    [todos],
  );

  useEffect(() => {
    const filtered = todosFilter(queryValue, filterValue);

    setCurrentTodos(filtered);
    setShowQueryCancel(queryValue !== '');
  }, [todos, queryValue, filterValue, todosFilter, setCurrentTodos]);

  function handleQuery(e: string) {
    const newQuery = String(e).trim();

    setQueryValue(newQuery);
  }

  function handleFilter(newFilter: string) {
    setFilterValue(newFilter);
  }

  function handleCancelQuery() {
    setQueryValue('');
    setShowQueryCancel(false);
  }

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            name="filter"
            value={filterValue}
            onChange={e => handleFilter(e.currentTarget.value)}
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
          name="query"
          onChange={e => handleQuery(e.currentTarget.value)}
          value={queryValue}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {showQueryCancel && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => handleCancelQuery()}
            />
          )}
        </span>
      </p>
    </form>
  );
};
