import React, { useState, ChangeEvent } from 'react';

type TodoFilterProps = {
  onFilterChange: (status: string) => void;
  handleQuery: (value: string) => void;
};

export const TodoFilter: React.FC<TodoFilterProps> = ({
  onFilterChange,
  handleQuery,
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [query, setQuery] = useState<string>('');

  const handleFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const status = event.target.value;

    setFilterStatus(status);
    onFilterChange(status);
  };

  const handleQueryChange = (
    { target: { value } }: ChangeEvent<HTMLInputElement>,
  ) => {
    setQuery(value);
    handleQuery(value);
  };

  const handleClearSearch = () => {
    setQuery('');
    handleQuery('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleFilterChange}
            value={filterStatus}
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
          <i className="fas fa-search" />
        </span>
        {query.length > 0 && (
          <span className="icon is-right">
            <button
              aria-label="control"
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClearSearch}
            />
          </span>
        )}
      </p>
    </form>
  );
};
