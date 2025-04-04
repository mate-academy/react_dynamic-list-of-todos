import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';

const enum FilterValues {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

interface TodoFilterProps {
  allTodos: Todo[];
  setFilteredTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export const TodoFilter: React.FC<TodoFilterProps> = ({
  setFilteredTodos,
  allTodos,
}) => {
  const [filterValue, setFilterValue] = useState<string>(FilterValues.All);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isDeleteBtnVisible, setIsDeleteBtnVisible] = useState<boolean>(true);

  const [isReadyToFilter, setIsReadyToFilter] = useState(false);

  useEffect(() => {
    if (allTodos.length > 0) {
      setIsReadyToFilter(true);
    }
  }, [allTodos]);

  useEffect(() => {
    if (!isReadyToFilter) {
      return;
    }

    let filtered = [...allTodos];

    switch (filterValue) {
      case FilterValues.Active:
        filtered = filtered.filter(todo => !todo.completed);
        break;
      case FilterValues.Completed:
        filtered = filtered.filter(todo => todo.completed);
        break;
      default:
        break;
    }

    if (searchQuery.trim() !== '') {
      filtered = filtered.filter(todo =>
        todo.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    setIsDeleteBtnVisible(searchQuery !== '');
    setFilteredTodos(filtered);
  }, [filterValue, searchQuery, allTodos, setFilteredTodos, isReadyToFilter]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterValue(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setIsDeleteBtnVisible(event.target.value !== '');
  };

  const clearSearch = () => {
    setSearchQuery('');
    setIsDeleteBtnVisible(false);
  };

  return (
    <form onSubmit={e => e.preventDefault()} className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterValue}
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
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        {isDeleteBtnVisible && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={clearSearch}
            />
          </span>
        )}
      </p>
    </form>
  );
};
