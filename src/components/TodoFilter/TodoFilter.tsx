import React, { useState } from 'react';
import { TodoList, TodoListProps } from '../TodoList';

export const TodoFilter: React.FC<TodoListProps> = ({ todos }) => {
  const [filter, setFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchIcon, setSearchIcon] = useState(false);

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const filteredTodos = todos.filter(todo => {
    const isMatchingSearch = todo.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const isMatchingFilter =
      filter === 'all'
        ? true
        : filter === 'active'
          ? !todo.completed
          : todo.completed;

    return isMatchingSearch && isMatchingFilter;
  });

  return (
    <>
      <form className="field has-addons">
        <p className="control">
          <span className="select">
            <select
              data-cy="statusSelect"
              value={filter}
              onChange={handleFilterChange}
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
            value={searchTerm}
            onChange={event => {
              handleSearchChange(event);
              setSearchIcon(true);
            }}
          />
          <span className="icon is-left">
            <i className="fas fa-magnifying-glass" />
          </span>

          {searchIcon && searchTerm.length !== 0 && (
            <span className="icon is-right" style={{ pointerEvents: 'all' }}>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={() => {
                  handleClearSearch();
                  setSearchIcon(false);
                }}
              />
            </span>
          )}
        </p>
      </form>
      <TodoList todos={filteredTodos} />
    </>
  );
};
