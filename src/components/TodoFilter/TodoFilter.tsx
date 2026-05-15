import React, { useState, useEffect } from 'react';
import { Todo } from '../../types/Todo';

type TodoFilterProps = {
  todos: Todo[];
  onFilterChange?: (filteredTodos: Todo[]) => void;
};

export const TodoFilter: React.FC<TodoFilterProps> = ({
  todos,
  onFilterChange,
}) => {
  const [selectBy, setSelectBy] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (onFilterChange) {
      let filteredTodos = [...todos];

      const normalizedSearch = search.trim().toLowerCase();

      filteredTodos = filteredTodos.filter(todo =>
        todo.title.toLowerCase().includes(normalizedSearch),
      );

      if (selectBy === 'active') {
        filteredTodos = filteredTodos.filter(todo => !todo.completed);
      }

      if (selectBy === 'completed') {
        filteredTodos = filteredTodos.filter(todo => todo.completed);
      }

      onFilterChange(filteredTodos);
    }
  }, [selectBy, search, todos, onFilterChange]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectBy}
            onChange={event => {
              setSelectBy(event.target.value);
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
          value={search}
          onChange={event => {
            setSearch(event.target.value);
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {search && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setSearch('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
