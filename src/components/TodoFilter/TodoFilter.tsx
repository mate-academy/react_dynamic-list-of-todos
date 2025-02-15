import React from 'react';

type TodoFilterState = {
  searchQuery: string;
  setFilterStatus: (status: string) => void;
  setSearchQuery: (query: string) => void;
};

export const TodoFilter: React.FC<TodoFilterState> = ({
  searchQuery,
  setFilterStatus,
  setSearchQuery,
}) => {
  const handleClear = () => {
    setSearchQuery('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={event => setFilterStatus(event.target.value)}
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
          onChange={e => setSearchQuery(e.target.value)}
          value={searchQuery}
          className="input"
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {searchQuery.length > 0 && (
            <button
              onClick={handleClear}
              data-cy="clearSearchButton"
              type="button"
              className="delete"
            />
          )}
        </span>
      </p>
    </form>
  );
};
