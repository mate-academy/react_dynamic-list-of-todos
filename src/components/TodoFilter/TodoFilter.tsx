import { FC, useEffect, useState } from 'react';

import { Todo } from '../../types/Todo';
import { SortType } from '../../types/SortType';

type Props = {
  todos: Todo[];
  setFilterTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const todoFilter = (
  todos: Todo[],
  sortType: SortType | string,
  query: string,
): Todo[] => {
  let filterTodos = [...todos];

  if (query) {
    filterTodos = filterTodos.filter(todo => (
      todo.title.toLowerCase().includes(query.trim().toLowerCase())
    ));
  }

  switch (sortType) {
    case SortType.Active:
      return filterTodos.filter(todo => !todo.completed);

    case SortType.Completed:
      return filterTodos.filter(todo => todo.completed);

    default:
      return filterTodos;
  }
};

export const TodoFilter: FC<Props> = ({ todos, setFilterTodos }) => {
  const [sortType, setSortType] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    const filteredTodos = todoFilter(todos, sortType, query);

    setFilterTodos(filteredTodos);
  }, [sortType, query, todos, setFilterTodos]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={event => setSortType(event.target.value)}
          >
            <option value="all">{SortType.All}</option>
            <option value="active">{SortType.Active}</option>
            <option value="completed">{SortType.Completed}</option>
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
          <span className="icon is-right">
            <button
              aria-label="Search Clear"
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
