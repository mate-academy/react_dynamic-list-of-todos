import React from 'react';

interface TodoFilterProps {
  filter: 'all' | 'completed' | 'active';
  setFilter: (filter: 'all' | 'completed' | 'active') => void;
  query: string;
  setQuery: (query: string) => void;
}

export const TodoFilter: React.FC<TodoFilterProps> = ({
  filter,
  setFilter,
  query,
  setQuery,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter}
            onChange={
              e => setFilter(e.target.value as 'all' | 'completed' | 'active') // Type assertion for filter value
            }
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
          onChange={e => setQuery(e.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>
        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setQuery('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
