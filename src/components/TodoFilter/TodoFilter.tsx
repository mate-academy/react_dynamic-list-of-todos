import React from 'react';

interface TodoFilterProps {
  query: string;
  setQuery: (query: string) => void;
  filteredBy: string;
  setFilteredBy: (option: string) => void;
}

export const TodoFilter: React.FC<TodoFilterProps> = React.memo(({
  query,
  setQuery,
  filteredBy,
  setFilteredBy,
}) => {
  const handleQueryReset = () => {
    setQuery('');
  };

  const changeSetFilteredBy = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilteredBy(event.target.value);
  };

  const changeSetQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filteredBy}
            onChange={changeSetFilteredBy}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          value={query}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          onChange={changeSetQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>
        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleQueryReset}
            />
          </span>
        )}
      </p>
    </form>
  );
});
