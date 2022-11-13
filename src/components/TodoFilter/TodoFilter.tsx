import React, { useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  setTodosFiltered: (todos: Todo[]) => void;
  todos: Todo[];
};

export const TodoFilter = React.memo<Props>(
  ({ setTodosFiltered, todos }) => {
    const [query, setQuery] = useState('');
    const [complitedStatus, setComplitedStatus] = useState('all');

    const filtrationTodos = (title = query, status = complitedStatus) => {
      setQuery(title);
      setComplitedStatus(status);

      const filteredByTitle = [...todos]
        .filter(todo => todo.title.includes(title));

      const filteredByComplite = filteredByTitle.filter(todo => {
        switch (status) {
          case 'active':
            return !todo.completed;
          case 'completed':
            return todo.completed;
          default:
            return todo;
        }
      });

      setTodosFiltered(filteredByComplite);
    };

    return (
      <form className="field has-addons">
        <p className="control">
          <span className="select">
            <select
              data-cy="statusSelect"
              onChange={(event) => filtrationTodos(query, event.target.value)}
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
            onChange={(event) => filtrationTodos(
              event.target.value, complitedStatus,
            )}
          />
          <span className="icon is-left">
            <i className="fas fa-magnifying-glass" />
          </span>

          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              aria-label="label"
              onClick={() => query && filtrationTodos('', complitedStatus)}
            />
          </span>
        </p>
      </form>
    );
  },
);
