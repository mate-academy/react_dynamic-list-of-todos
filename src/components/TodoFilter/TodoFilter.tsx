import React from 'react';

type TodoStatus = 'all' | 'active' | 'completed';

type TodoFilterProps = {
  statusFilter: TodoStatus;
  query: string;
  onStatusChange: (newStatus: TodoStatus) => void;
  onQueryChange: (newQuery: string) => void;
  onClearQuery: () => void;
};

export const TodoFilter: React.FC<TodoFilterProps> = ({
  statusFilter,
  query,
  onStatusChange,
  onQueryChange,
  onClearQuery,
}) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onStatusChange(e.target.value as TodoStatus);
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onQueryChange(e.target.value);
  };

  return (
    <form className="field has-addons" onSubmit={handleSubmit}>
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={statusFilter}
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
          value={query}
          onChange={handleQueryChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {query && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={onClearQuery}
            />
          )}
        </span>
      </p>
    </form>
  );
};
