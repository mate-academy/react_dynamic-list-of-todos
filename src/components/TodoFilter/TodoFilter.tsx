import React from 'react';

type Props = {
  query: string; // Current search query
  status: 'all' | 'completed' | 'active'; // Completed status filter
  onFilterChange: (
    query: string,
    status: 'all' | 'completed' | 'active',
  ) => void; // Callback for changes
  onClearQuery: () => void; // Callback to clear the query
};

export const TodoFilter: React.FC<Props> = ({
  query,
  status,
  onFilterChange,
  onClearQuery,
}) => {
  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange(query, event.target.value as 'all' | 'completed' | 'active');
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange(event.target.value, status);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={handleStatusChange} // Use the callback for status
            aria-label="Filter by status"
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
          onChange={handleQueryChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right iconRight">
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              aria-label="Clear search"
              onClick={onClearQuery}
            />
          </span>
        )}
      </p>
    </form>
  );
};
