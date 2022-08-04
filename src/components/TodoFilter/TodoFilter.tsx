// import React from 'react';
import React, { useState, useEffect } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  onSetVisibleTodos: (todos: Todo[]) => void;
};

enum Select {
  ALL = 'all',
  ACTIVE = 'active',
  COMLETED = 'completed',
}

export const TodoFilter: React.FC<Props> = ({
  todos,
  onSetVisibleTodos,
}) => {
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>(todos);
  const [query, setQuery] = useState('');

  const inputedTodos = filteredTodos
    .filter(todo => (
      todo.title
        .toLowerCase()
        .includes(query.toLowerCase())
    ));

  useEffect(() => {
    onSetVisibleTodos(inputedTodos);
  }, [query, filteredTodos]);

  const handleStatusSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    switch (event.target.value) {
      case Select.ALL:
        setFilteredTodos(todos);
        break;

      case Select.ACTIVE:
        setFilteredTodos(todos.filter(todo => !todo.completed));
        break;

      case Select.COMLETED:
        setFilteredTodos(todos.filter(todo => todo.completed));
        break;

      default:
        break;
    }
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleStatusSelect}
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
          onChange={(event) => setQuery(event.target.value)}
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
            onClick={() => setQuery('')}
          />
        </span>
      </p>
    </form>
  );
};
