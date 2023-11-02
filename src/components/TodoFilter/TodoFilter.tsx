import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';

function filterTodos(
  todos: Todo[],
  filterMethod: string,
  query: string,
): Todo[] {
  let copy = [...todos];

  if (query) {
    (copy = [...todos]
      .filter(todo => todo.title
        .toLowerCase()
        .includes(query.toLowerCase())));
  }

  if (filterMethod === 'active') {
    (copy = copy.filter(todo => !todo.completed));
  }

  if (filterMethod === 'completed') {
    (copy = copy.filter(todo => todo.completed));
  }

  return copy;
}

type Props = {
  todos: Todo[];
  setFilteredTodos: (todos: Todo[]) => void,
};

export const TodoFilter: React.FC<Props> = ({ todos, setFilteredTodos }) => {
  const [filterMethod, setFilterMethod] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    setFilteredTodos(filterTodos(todos, filterMethod, query));
  }, [query, filterMethod, todos, setFilteredTodos]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={event => setFilterMethod(event.target.value)}
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

        {(query) && (
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
