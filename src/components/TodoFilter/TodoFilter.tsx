import React, { useCallback, useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import debounce from 'lodash.debounce';

type Props = {
  todos: Todo[];
  onFilter: (todos: Todo[]) => void;
};

export const TodoFilter: React.FC<Props> = ({ todos, onFilter }) => {
  const [status, setStatus] = useState('all');
  const [query, setQuery] = useState('');
  const [finalQuery, setFinalQuery] = useState('');

  const filterTodos = useCallback(debounce(setFinalQuery, 500), []);

  useEffect(() => {
    let preparedTodos =
      status === 'completed'
        ? todos.filter(todo => todo.completed)
        : status === 'active'
          ? todos.filter(todo => !todo.completed)
          : [...todos];

    if (finalQuery) {
      preparedTodos = preparedTodos.filter(todo =>
        todo.title.toLowerCase().includes(finalQuery.toLowerCase()),
      );
    }

    onFilter(preparedTodos);
  }, [todos, status, finalQuery]);

  const reset = () => {
    setStatus('all');
    setQuery('');
    setFinalQuery('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={event => setStatus(event.target.value)}
            value={status}
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
          onChange={event => {
            setQuery(event.target.value);
            filterTodos(event.target.value);
          }}
          value={query}
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
              onClick={reset}
            />
          </span>
        )}
      </p>
    </form>
  );
};
