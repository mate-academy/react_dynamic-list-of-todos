import React from 'react';
import { Todo } from '../../types/Todo';

interface TodoFilterProps {
  query: string;
  statusFilter: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  setStatusFilter: React.Dispatch<React.SetStateAction<string>>;
  setResults: (filteredTodos: Todo[] | string) => void;
}

export const TodoFilter: React.FC<TodoFilterProps> = ({
  query,
  statusFilter,
  setQuery,
  setStatusFilter,
}) => {
  const handleInputChange = (value: string) => {
    setQuery(value);
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
  };

  const handleClearFilter = () => {
    setQuery('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={statusFilter}
            onChange={e => handleStatusChange(e.target.value)}
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
          onChange={e => handleInputChange(e.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-search" />
        </span>

        {query && (
          <span className="icon is-right">
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClearFilter}
            />
          </span>
        )}
      </p>
    </form>
  );
};
