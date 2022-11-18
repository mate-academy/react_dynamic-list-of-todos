import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import { ComplitedStatus } from '../../types/СomplitedStatus';

type Props = {
  setTodosFiltered: (todos: Todo[]) => void;
  todos: Todo[];
};

export const TodoFilter = React.memo<Props>(
  ({ setTodosFiltered, todos }) => {
    const [query, setQuery] = useState('');
    const [complitedStatus, setComplitedStatus] = useState('all');

    const filtrationTodos = () => {
      const filteredByTitle = [...todos]
        .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));

      const filteredByComplite = filteredByTitle.filter(todo => {
        switch (complitedStatus) {
          case ComplitedStatus.ACTIVE:
            return !todo.completed;
          case ComplitedStatus.COMPLETED:
            return todo.completed;
          default:
            return todo;
        }
      });

      return filteredByComplite;
    };

    setTodosFiltered(filtrationTodos());

    const resetForm = () => {
      setQuery('');
    };

    return (
      <form className="field has-addons">
        <p className="control">
          <span className="select">
            <select
              data-cy="statusSelect"
              value={complitedStatus}
              onChange={(event) => setComplitedStatus(event.target.value)}
            >
              <option value={ComplitedStatus.ALL}>All</option>
              <option value={ComplitedStatus.ACTIVE}>Active</option>
              <option value={ComplitedStatus.COMPLETED}>Completed</option>
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

          {query && (
            <span className="icon is-right" style={{ pointerEvents: 'all' }}>
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                aria-label="label"
                onClick={resetForm}
              />
            </span>
          )}
        </p>
      </form>
    );
  },
);
