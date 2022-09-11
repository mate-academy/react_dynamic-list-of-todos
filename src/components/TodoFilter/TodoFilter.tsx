import React, { Dispatch, useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[]
  setTodos: Dispatch<Todo[]>
};

export const TodoFilter: React.FC<Props> = ({
  todos,
  setTodos,
}) => {
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    setTodos(todos.filter(todo => (
      todo.title.toLowerCase().includes(query.trim().toLowerCase())
    )).filter(todo => {
      switch (filterType) {
        case 'all':
          return true;
        case 'active':
          return !todo.completed;
        case 'completed':
          return todo.completed;
        default:
          return 'Hello World';
      }
    }));
  }, [query, filterType]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(event) => {
              setFilterType(event.target.value);
            }}
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
          onChange={(event) => {
            setQuery(event.target.value);
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => {
              setQuery('');
            }}
          />
        </span>
      </p>
    </form>
  );
};
