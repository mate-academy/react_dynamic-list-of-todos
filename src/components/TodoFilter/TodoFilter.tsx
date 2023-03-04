import React from 'react';
import { TodoStatus } from '../../types/TodoStatus';

type Props = {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  selectedTodoStatus: string;
  setSelectedTodoStatus: React.Dispatch<React.SetStateAction<TodoStatus>>;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  setQuery,
  selectedTodoStatus,
  setSelectedTodoStatus,
}) => {
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    switch (event.target.value) {
      case TodoStatus.Active:
        setSelectedTodoStatus(TodoStatus.Active);
        break;

      case TodoStatus.Completed:
        setSelectedTodoStatus(TodoStatus.Completed);
        break;

      default:
        setSelectedTodoStatus(TodoStatus.All);
        break;
    }
  };

  const handleClearInput = () => setQuery('');
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form className="field has-addons" onSubmit={handleSubmit}>
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectedTodoStatus}
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
          placeholder="Search..."
          value={query}
          onChange={handleInput}
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
              aria-label="delete"
              onClick={handleClearInput}
            />
          )}
        </span>
      </p>
    </form>
  );
};
