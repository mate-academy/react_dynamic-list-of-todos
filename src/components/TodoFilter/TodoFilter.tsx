import React from 'react';

interface Props {
  query: string;
  onSearch: (query: string) => void;
  onFilterChange: (status: string) => void;
}

export const TodoFilter: React.FC<Props> = ({
  query,
  onSearch,
  onFilterChange,
}) => (
  <div>
    <input
      type="text"
      value={query}
      data-cy="searchInput"
      onChange={e => onSearch(e.target.value)}
      placeholder="Search by title"
    />
    {query && (
      <button onClick={() => onSearch('')} data-cy="clearSearchButton">
        x
      </button>
    )}
    <select
      data-cy="statusSelect"
      onChange={e => onFilterChange(e.target.value)}
    >
      <option value="all">All</option>
      <option value="completed">Completed</option>
      <option value="active">Active</option>
    </select>
  </div>
);
