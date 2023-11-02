/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';

enum SortOptions {
  Active = 'active',
  Completed = 'completed',
  All = 'all',
}

const filterTodo = (todos: Todo[], sortBy: string, query: string) => {
  let fiteredTodos = [...todos];

  switch (sortBy) {
    case SortOptions.Active:
      fiteredTodos = todos.filter(todo => !todo.completed);
      break;

    case SortOptions.Completed:
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

type Props = {
  todos: Todo[],
  setFilteredTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
};

export const TodoFilter: React.FC<Props> = ({ todos, setFilteredTodos }) => {
  const [query, setQuery] = useState('');
  const [filterBy, setFilterBy] = useState('');

  useEffect(() => {
    const newTodos = filterTodo(todos, filterBy, query);

    setFilteredTodos(newTodos);
  }, [filterBy, query, todos, setFilteredTodos]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(e) => setFilterBy(e.target.value)}
          >
            <option value={SortOptions.All}>All</option>

            <option value={SortOptions.Active}>Active</option>

            <option value={SortOptions.Completed}>Completed</option>
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
          onChange={(e) => setQuery(e.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>

          {query
            && (
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={() => setQuery('')}
              />
            )}

        </span>
      </p>
    </form>
  );
};
