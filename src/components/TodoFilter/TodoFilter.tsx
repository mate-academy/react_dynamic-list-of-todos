import React, { useState } from 'react';
import { Todo } from '../../types/Todo';

interface TodoFilterProps {
  todos: Todo[];
  onFilter: (filteredTodos: Todo[]) => void;
}

export const TodoFilter: React.FC<TodoFilterProps> = ({ todos, onFilter }) => {
  const [searchText, setSearchText] = useState<string>('');
  const [status, setStatus] = useState<string>('all');
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const filterTodos = (status: string, searchText: string) => {
    let filtered = todos;

    if (status !== 'all') {
      filtered = filtered.filter(todo =>
        status === 'active' ? !todo.completed : todo.completed,
      );
    }

    if (searchText) {
      filtered = filtered.filter(todo =>
        todo.title.toLowerCase().includes(searchText.toLowerCase()),
      );
    }

    onFilter(filtered);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;

    setStatus(newStatus);

    filterTodos(newStatus, searchText);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchText = e.target.value;

    setSearchText(newSearchText);
    filterTodos(status, newSearchText);
  };

  const handleClearSearch = () => {
    setSearchText('');
    filterTodos(status, '');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
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
          value={searchText}
          onChange={handleSearchChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {searchText.length !== 0 ? (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClearSearch}
            />
          ) : null}
        </span>
      </p>
    </form>
  );
};
