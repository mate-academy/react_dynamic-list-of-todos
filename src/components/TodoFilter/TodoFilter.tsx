import { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';

function filterTodos(
  todos: Todo[],
  filterBy: string,
  query: string,
): Todo[] {
  let filteredTodos = [...todos];

  switch (filterBy) {
    case 'active':
      filteredTodos = todos.filter(todo => !todo.completed);
      break;

    case 'completed':
      filteredTodos = todos.filter(todo => todo.completed);
      break;

    default:
      break;
  }

  if (query) {
    filteredTodos = filteredTodos
      .filter(todo => todo.title
        .toLowerCase()
        .includes(query.toLowerCase()));
  }

  return filteredTodos;
}

type Props = {
  todos: Todo[],
  setFilteredTodos: (todos: Todo[]) => void
};

export const TodoFilter: React.FC<Props> = ({ todos, setFilteredTodos }) => {
  const [query, setQuery] = useState('');
  const [filterBy, setFilterBy] = useState('');

  useEffect(() => {
    const filteredTodos = filterTodos(todos, filterBy, query);

    setFilteredTodos(filteredTodos);
  }, [todos, filterBy, query, setFilteredTodos]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={event => setFilterBy(event.target.value)}
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
          onChange={event => setQuery(event.target.value)}
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
