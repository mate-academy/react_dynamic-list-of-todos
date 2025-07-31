import React, { useEffect, useState } from 'react';
import { TodoFilterProps } from '../../types/CommonTypes';

export const TodoFilter: React.FC<TodoFilterProps> = ({
  todos,
  onSelected,
}) => {
  const [query, setQuery] = useState('');
  const [filterOption, setFilterOption] = useState('');

  useEffect(() => {
    if (!todos) {
      return;
    }

    let filteredTodos = [...todos];

    if (filterOption === 'active') {
      filteredTodos = filteredTodos.filter(todo => !todo.completed);
    } else if (filterOption === 'completed') {
      filteredTodos = filteredTodos.filter(todo => todo.completed);
    }

    if (query.trim()) {
      filteredTodos = filteredTodos.filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    onSelected(filteredTodos);
  }, [query, filterOption, todos, onSelected]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={event => setFilterOption(event.target.value)}
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

        {query.length > 0 && (
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
