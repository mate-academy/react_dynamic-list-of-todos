import React, { useState } from 'react';
import { Todo } from '../../types/Todo';

interface TodoProps {
  todos: Todo[];
  onFilterChange: (filteredTodos: Todo[]) => void;
}

export const TodoFilter: React.FC<TodoProps> = ({ todos, onFilterChange }) => {
  const [searchRequest, setSearchRequest] = useState('');
  const [filterType, setFilterStatus] = useState('all');

  const filterByType = (todosList: Todo[], type: string) => {
    return todosList.filter(todo => {
      if (type === 'active') {
        return !todo.completed;
      } else if (type === 'completed') {
        return todo.completed;
      } else {
        return true;
      }
    });
  };

  const filterBySearch = (todosList: Todo[], searchText: string) => {
    return todosList.filter(todo =>
      todo.title.toLowerCase().includes(searchText.toLowerCase().trim()),
    );
  };

  const handleFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const status = event.target.value;

    setFilterStatus(status);

    const filteredStatus = filterByType(todos, status);
    const searchFilteredTodos = filterBySearch(filteredStatus, searchRequest);

    onFilterChange(searchFilteredTodos);
  };

  const handleSearchTodo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = event.target.value;

    setSearchRequest(searchText);

    const typeFilteredTodos = filterByType(todos, filterType);
    const searchFilteredTodos = filterBySearch(typeFilteredTodos, searchText);

    onFilterChange(searchFilteredTodos);
  };

  const handleClearSearchField = () => {
    setSearchRequest('');
    const typeFilteredTodos = filterByType(todos, filterType);

    onFilterChange(typeFilteredTodos);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterType}
            onChange={handleFilter}
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
          value={searchRequest}
          onChange={handleSearchTodo}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {searchRequest && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              value={searchRequest}
              onClick={handleClearSearchField}
            />
          )}
        </span>
      </p>
    </form>
  );
};
