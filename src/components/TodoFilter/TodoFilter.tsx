import React, { ChangeEvent, FC, useState } from 'react';
import { Todo } from '../../types/Todo';

interface TodoFilterProps {
  todos: Todo[];
  setFilteredTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export const TodoFilter: FC<TodoFilterProps> = ({ todos, setFilteredTodos }) => {
  const [searchInput, setSearchInput] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const handleStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const status = event.target.value;
    setSelectedStatus(status);
    applyFilters(status, searchInput);
  };

  const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.currentTarget.value.toLowerCase();
    setSearchInput(input);
    applyFilters(selectedStatus, input);
  };

  const applyFilters = (status: string, input: string) => {
    let filteredTodos = todos;

    switch (status) {
      case 'active':
        filteredTodos = todos.filter((todo) => !todo.completed);
        break;
      case 'completed':
        filteredTodos = todos.filter((todo) => todo.completed);
        break;
      default:
        break;
    }

    // Apply search filter
    if (input) {
      filteredTodos = filteredTodos.filter((todo) =>
        todo.title.toLowerCase().includes(input)
      );
    }

    setFilteredTodos(filteredTodos);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
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
          value={searchInput}
          onChange={handleSearchInputChange}
        />
        <span className="icon is-left">
          <i className="fas fa-search" />
        </span>

        <span className="icon is-right">
          {searchInput && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => {
                setSearchInput('');
                applyFilters(selectedStatus, '');
              }}
            />
          )}
        </span>
      </p>
    </form>
  );
};