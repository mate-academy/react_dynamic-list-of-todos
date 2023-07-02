import React, { useState, useEffect } from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[],
  setFilteredTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

export const TodoFilter: React.FC<Props> = ({ todos, setFilteredTodos }) => {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('');

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedStatus = event.target.value;

    setStatus(selectedStatus);
  };

  useEffect(() => {
    const filteredTodos = todos.filter((todo) => {
      const { title } = todo;
      const trimmedQuery = query.trim().toLowerCase();

      return title.toLowerCase().includes(trimmedQuery);
    });

    let updatedTodos;

    switch (status) {
      case 'active': {
        updatedTodos = filteredTodos.filter(todo => !todo.completed);
        break;
      }

      case 'completed': {
        updatedTodos = filteredTodos.filter(todo => todo.completed);
        break;
      }

      default: updatedTodos = filteredTodos;
    }

    setFilteredTodos(updatedTodos);
  }, [todos, query, status, setFilteredTodos]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            defaultValue="all"
            onChange={handleStatusChange}
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
          onChange={handleQueryChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query && (
            // eslint-disable-next-line jsx-a11y/control-has-associated-label
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
