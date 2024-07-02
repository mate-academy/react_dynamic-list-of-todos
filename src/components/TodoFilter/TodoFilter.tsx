import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  filteredTodos: (filterTodos: Todo[]) => void;
};
export const TodoFilter: React.FC<Props> = ({ todos, filteredTodos }) => {
  const [filteredType, setFilteredType] = useState('All');
  const [query, setQuery] = useState('');

  // console.log(filteredType);

  useEffect(() => {
    let filtered = todos;

    if (filteredType === 'active') {
      filtered = todos.filter(todo => !todo.completed);
    } else if (filteredType === 'completed') {
      filtered = todos.filter(todo => todo.completed);
    }

    if (query) {
      filtered = filtered.filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    filteredTodos(filtered);
  }, [todos, filteredType, query, filteredTodos]);

  const handleChangeOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilteredType(event.target.value);
  };

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleChangeOption}>
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
          onChange={handleChangeQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {query && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setQuery('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
