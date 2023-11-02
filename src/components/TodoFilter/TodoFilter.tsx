import { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  setFilteredTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
};

const COMPLETED_FILTER = 'completed';
const ACTIVE_FILTER = 'active';

const filterTodos = (todos: Todo[], sortBy: string, query: string) => {
  let fiteredTodos = [...todos];

  switch (sortBy) {
    case ACTIVE_FILTER:
      fiteredTodos = todos.filter(todo => !todo.completed);
      break;

    case COMPLETED_FILTER:
      fiteredTodos = todos.filter(todo => todo.completed);
      break;

    default:
      break;
  }

  if (query) {
    fiteredTodos = fiteredTodos
      .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));
  }

  return fiteredTodos;
};

export const TodoFilter: React.FC<Props> = ({
  todos,
  setFilteredTodos,
}) => {
  const [filterBy, setFilterBy] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    const filteredTodos = filterTodos(todos, filterBy, query);

    setFilteredTodos(filteredTodos);
  }, [filterBy, query, todos, setFilteredTodos]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(event) => setFilterBy(event.target.value)}
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
          onChange={(event) => setQuery(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query.length !== 0
        && (
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
