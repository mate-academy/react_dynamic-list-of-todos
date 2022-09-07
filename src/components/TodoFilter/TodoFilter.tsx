import React, { useState, useEffect } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  onFilterTodo: (todos: Todo[]) => void,
};

export const TodoFilter: React.FC<Props> = ({
  todos,
  onFilterTodo,
}) => {
  const [query, setQuery] = useState('');
  const [filtered, setfiltered] = useState<Todo[]>([]);

  useEffect(() => {
    onFilterTodo(filtered
      .filter(
        todo => todo.title.toLowerCase().includes(query.toLowerCase()),
      ));
  }, [query, filtered]);

  const handleFilter = (value: string) => {
    switch (value) {
      case 'all':
        setfiltered(todos);
        break;
      case 'active':
        setfiltered(todos.filter(todo => !todo.completed));
        break;
      case 'completed':
        setfiltered(todos.filter(todo => todo.completed));
        break;

      default:
        break;
    }
  };

  return (
    <form
      className="field has-addons"
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <p className="control">
        <div className="select">
          <select
            data-cy="statusSelect"
            onChange={(event) => {
              handleFilter(event.target.value);
            }}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
          }}
        />
        <div className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </div>

        {query && (
          <div
            className="icon is-right"
            style={{ pointerEvents: 'all' }}
          >
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setQuery('')}
            />
          </div>
        )}
      </p>
    </form>
  );
};
