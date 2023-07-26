import { useState, useEffect } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  handleFilteredTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const enum FilteredBy {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

function getFilteredByOwner(
  todos: Todo[],
  { filterBy, query }: { filterBy: FilteredBy, query: string },
) {
  let preparedTodos = [...todos];

  if (filterBy === 'active') {
    preparedTodos = todos.filter(todo => !todo.completed);
  }

  if (filterBy === 'completed') {
    preparedTodos = todos.filter(todo => todo.completed);
  }

  if (query) {
    return preparedTodos.filter(todo => todo.title
      .toLowerCase()
      .includes(query.toLowerCase()));
  }

  return preparedTodos;
}

export const TodoFilter: React.FC<Props> = ({ todos, handleFilteredTodos }) => {
  const [filterBy, setFilterBy] = useState(FilteredBy.ALL);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const visibleTodos = getFilteredByOwner(todos, { filterBy, query });

    handleFilteredTodos(visibleTodos);
  }, [filterBy, todos, query]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterBy}
            onChange={
              (event: React.ChangeEvent<HTMLSelectElement>) => setFilterBy(
                event.target.value as FilteredBy,
              )
            }
          >
            <option value={FilteredBy.ALL}>
              All
            </option>

            <option value={FilteredBy.ACTIVE}>
              Active
            </option>

            <option value={FilteredBy.COMPLETED}>
              Completed
            </option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          value={query}
          onChange={
            (event) => {
              setQuery(event.target.value);
            }
          }
          type="text"
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
