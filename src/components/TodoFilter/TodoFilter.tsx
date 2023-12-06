import { FC, useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  setFilteredTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

enum SortType {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

const todoFilter = (
  todos: Todo[],
  sortType: string,
  query: string,
): Todo[] => {
  let filteredTodos = [...todos];

  switch (sortType) {
    case SortType.Active:
      filteredTodos = filteredTodos.filter(todo => !todo.completed);
      break;

    case SortType.Completed:
      filteredTodos = filteredTodos.filter(todo => todo.completed);
      break;

    default:
      break;
  }

  if (query) {
    filteredTodos = filteredTodos.filter(todo => (
      todo.title.toLowerCase().includes(query.trim().toLowerCase())
    ));
  }

  return filteredTodos;
};

export const TodoFilter: FC<Props> = ({
  todos,
  setFilteredTodos,
}) => {
  const [sortType, setSortType] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    const filteredTodos = todoFilter(todos, sortType, query);

    setFilteredTodos(filteredTodos);
  }, [sortType, query, todos, setFilteredTodos]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={e => setSortType(e.target.value)}
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
          onChange={e => setQuery(e.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right">
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
