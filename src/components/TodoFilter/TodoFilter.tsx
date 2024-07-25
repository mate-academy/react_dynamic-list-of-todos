import React, { useCallback, useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todoList: Todo[];
  onFilterChange: (filteredTodos: Todo[]) => void;
};

type Status = 'all' | 'completed' | 'active';

export const TodoFilter: React.FC<Props> = ({ todoList, onFilterChange }) => {
  const [status, setStatus] = useState<Status>('all');
  const [searchText, setSearchText] = useState('');

  const applyFilter = useCallback(() => {
    let filteredTodos: Todo[];

    switch (status) {
      case 'active':
        filteredTodos = todoList.filter(todo => !todo.completed);
        break;
      case 'completed':
        filteredTodos = todoList.filter(todo => todo.completed);
        break;
      default:
        filteredTodos = todoList;
    }

    if (searchText) {
      filteredTodos = filteredTodos.filter(todo =>
        todo.title.toLowerCase().includes(searchText.toLowerCase()),
      );
    }

    onFilterChange(filteredTodos);
  }, [status, searchText, todoList, onFilterChange]);

  useEffect(() => {
    applyFilter();
  }, [applyFilter]);

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = event.target.value as Status;

    setStatus(newStatus);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newText = event.target.value;

    setSearchText(newText);
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
          onChange={handleTextChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {searchText && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => {
                setSearchText('');
              }}
            />
          </span>
        )}
      </p>
    </form>
  );
};
