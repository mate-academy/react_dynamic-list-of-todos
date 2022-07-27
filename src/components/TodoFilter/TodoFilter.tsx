/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  setTodosToShow: (value: Todo[]) => void;
};

// enum TodosFilterType {
//   'active',
//   'completed',
//   'all',
// }

export const TodoFilter: React.FC<Props> = ({ todos, setTodosToShow }) => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    let filteredTodos;

    switch (statusFilter) {
      case ('active'):
        filteredTodos = todos.filter(todo => !todo.completed);
        break;
      case ('completed'):
        filteredTodos = todos.filter(todo => todo.completed);
        break;
      default:
        filteredTodos = todos;
    }

    filteredTodos = filteredTodos
      .filter(todo => todo.title.includes(searchQuery));

    setTodosToShow(filteredTodos);
  }, [statusFilter, searchQuery]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(event) => setStatusFilter(event.target.value)}
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
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {searchQuery && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setSearchQuery('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
