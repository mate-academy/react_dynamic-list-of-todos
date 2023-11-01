import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';

const filter = (todos: Todo[], sort: string, query: string) => {
  let fiteredTodos = [...todos];

  switch (sort) {
    case 'active':
      fiteredTodos = todos.filter(todo => !todo.completed);
      break;

    case 'completed':
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

export const TodoFilter: React.FC<Props> = ({
  todos,
  setFilteredTodos,
}) => {
  const [query, setQuery] = useState('');
  const [filterBy, setFilterBy] = useState('');

  useEffect(() => {
    const newTodos = filter(todos, filterBy, query);

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
            <option value="all">
              All
            </option>

            <option value="active">
              Active
            </option>

            <option value="completed">
              Completed
            </option>
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

        {query && (
          <>
            <span className="icon is-right" style={{ pointerEvents: 'all' }}>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={() => setQuery('')}
              />
            </span>
          </>
        )}
      </p>
    </form>
  );
};
