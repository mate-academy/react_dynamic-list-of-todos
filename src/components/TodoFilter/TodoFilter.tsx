import { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import { Valid } from '../../types/ValidFilter';

type Props = {
  todos: Todo[],
  setFilterTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
};

const filterTodos = (todos: Todo[], sortBy: string, query: string) => {
  let filteredTodos = [...todos];

  switch (sortBy) {
    case Valid.ACTIVE_FILTER:
      filteredTodos = todos.filter(todo => !todo.completed);
      break;

    case Valid.COMPLETED__FILTER:
      filteredTodos = todos.filter(todo => todo.completed);
      break;

    default:
      break;
  }

  if (query) {
    filteredTodos = filteredTodos
      .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));
  }

  return filteredTodos;
};

export const TodoFilter: React.FC<Props> = ({
  todos,
  setFilterTodos,
}) => {
  const [filterBy, setFilterBy] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    const filteredTodos = filterTodos(todos, filterBy, query);

    setFilterTodos(filteredTodos);
  }, [filterBy, query, todos, setFilterTodos]);

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
