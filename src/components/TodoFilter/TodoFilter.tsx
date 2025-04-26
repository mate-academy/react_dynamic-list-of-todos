import React from 'react';

interface TodoFilterProps {
  query: string;
  filterBy: 'all' | 'completed' | 'active';
  onQueryChange: (query: string) => void;
  onFilterChange: (filterBy: 'all' | 'completed' | 'active') => void;
  onClearQuery: () => void;
}

const TodoFilter: React.FC<TodoFilterProps> = ({
  query,
  filterBy,
  onQueryChange,
  onFilterChange,
  onClearQuery,
}) => (
  <div>
    <input
      type="text"
      value={query}
      onChange={e => onQueryChange(e.target.value)}
      placeholder="Search by title"
    />
    {query && <button onClick={onClearQuery}>x</button>}
    <select value={filterBy} onChange={e => onFilterChange(e.target.value as 'all' | 'completed' | 'active')}>
      <option value="all">All</option>
      <option value="completed">Completed</option>
      <option value="active">Active</option>
    </select>
  </div>
);

export default TodoFilter;
