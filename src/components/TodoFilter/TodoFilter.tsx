import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todosToFilter: Todo[];
  applyFilters: (todos: Todo[]) => void;
};

enum Statuses {
  all = 'all',
  active = 'active',
  completed = 'completed',
}

export const TodoFilter: React.FC<Props> = ({
  todosToFilter,
  applyFilters,
}) => {
  const [statusFilter, setStatusFilter] = useState(Statuses.all);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const filter = (todos: Todo[]) => {
      return todos
        .filter(todo => {
          if (statusFilter === Statuses.all) {
            return true;
          } else {
            return todo.completed === (statusFilter === Statuses.completed);
          }
        })
        .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));
    };

    applyFilters(filter(todosToFilter));
  }, [todosToFilter, statusFilter, query]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            title="statusSelect"
            onChange={event =>
              setStatusFilter(
                Statuses[event.target.value as keyof typeof Statuses],
              )
            }
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

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              title="X"
              onClick={() => setQuery('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
