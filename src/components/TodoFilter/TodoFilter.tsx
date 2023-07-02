import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';

interface TodoFilterProps {
  initialTodos: Todo[],
  setTodos: (todos: Todo[]) => void,
}

export const TodoFilter: React.FC<TodoFilterProps> = ({
  initialTodos,
  setTodos,
}) => {
  const [selectedTodos, setSelectedTodos] = useState('all');
  const [query, setQuery] = useState('');

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTodos(e.target.value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleDelete = () => {
    setQuery('');
  };

  useEffect(() => {
    let filteredTodos = initialTodos;

    switch (selectedTodos) {
      case 'active':
        filteredTodos = filteredTodos.filter(todo => !todo.completed);
        break;

      case 'completed':
        filteredTodos = filteredTodos.filter(todo => todo.completed);
        break;

      default:
        break;
    }

    setTodos(filteredTodos
      .filter(todo => todo.title.includes(query.toLowerCase())));
  }, [selectedTodos, query]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectedTodos}
            onChange={handleSelect}
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
          value={query}
          className="input"
          placeholder="Search..."
          onChange={handleChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query !== '' && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleDelete}
            />
          </span>
        )}
      </p>
    </form>
  );
};
