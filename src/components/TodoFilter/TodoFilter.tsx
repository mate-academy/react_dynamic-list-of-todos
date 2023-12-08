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

  if (query) {
    filteredTodos = filteredTodos.filter(todo => (
      todo.title.toLowerCase().includes(query.trim().toLowerCase())
    ));
  }

  switch (sortType) {
    case SortType.Active:
      return filteredTodos.filter(todo => !todo.completed);

    case SortType.Completed:
      return filteredTodos.filter(todo => todo.completed);

    default:
      return filteredTodos;
  }
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
            <button
              aria-label="Clear Search"
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
