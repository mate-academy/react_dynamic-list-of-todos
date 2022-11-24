import React from 'react';
import { TodosStatus } from '../../types/TodosStatus';

interface Props {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  selectedTodosStatus: string;
  setSelectedTodosStatus: React.Dispatch<React.SetStateAction<TodosStatus>>;
}

export const TodoFilter: React.FC<Props> = ({
  query,
  setQuery,
  selectedTodosStatus,
  setSelectedTodosStatus,
}) => {
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    switch (e.target.value) {
      case TodosStatus.Active:
        setSelectedTodosStatus(TodosStatus.Active);
        break;

      case TodosStatus.Completed:
        setSelectedTodosStatus(TodosStatus.Completed);
        break;

      default:
        setSelectedTodosStatus(TodosStatus.All);
        break;
    }
  };

  const handleClearInput = () => setQuery('');
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form className="field has-addons" onSubmit={handleSubmit}>
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectedTodosStatus}
            onChange={handleSelection}
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
          value={query}
          onChange={handleInput}
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              aria-label="clear input"
              onClick={handleClearInput}
            />
          )}
        </span>
      </p>
    </form>
  );
};
