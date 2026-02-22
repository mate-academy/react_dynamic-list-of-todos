import React, { useState } from 'react';
import { Todo } from '../../types/Todo';

type Filter = 'all' | 'active' | 'completed';

type Props = {
  todos: Todo[];
  onFilterChange: (todos: Todo[]) => void;
};

export const TodoFilter: React.FC<Props> = ({ todos, onFilterChange }) => {
  const [inputValue, setInputValue] = useState('');
  const [statusFilter, setStatusFilter] = useState<Filter>('all');

  const applyFilters = (currentStatus: Filter, searchText: string) => {
    let filtered = [...todos];

    if (currentStatus === 'active') {
      filtered = filtered.filter(todo => !todo.completed);
    } else if (currentStatus === 'completed') {
      filtered = filtered.filter(todo => todo.completed);
    }

    if (searchText.trim()) {
      filtered = filtered.filter(todo =>
        todo.title.toLowerCase().includes(searchText.toLowerCase()),
      );
    }

    onFilterChange(filtered);
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = event.target.value as Filter;

    setStatusFilter(newStatus);
    applyFilters(newStatus, inputValue);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    setInputValue(newValue);
    applyFilters(statusFilter, newValue);
  };

  const handleClearSearch = () => {
    setInputValue('');
    applyFilters(statusFilter, '');
  };

  return (
    <form className="field has-addons" onSubmit={e => e.preventDefault()}>
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={statusFilter}
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
          className="input"
          placeholder="Search..."
          value={inputValue}
          onChange={handleInputChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span
          className="icon is-right"
          style={{
            pointerEvents: 'all',
            display: inputValue ? 'inline-flex' : 'none',
          }}
        >
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={handleClearSearch}
          />
        </span>
      </p>
    </form>
  );
};
