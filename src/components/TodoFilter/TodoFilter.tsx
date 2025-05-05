import React from 'react';

interface TodoFilterProps {
  query: string;
  filterBy: 'all' | 'completed' | 'active';
  onQueryChange: (query: string) => void;
  onFilterChange: (filterBy: 'all' | 'completed' | 'active') => void;
}

const TodoFilter: React.FC<TodoFilterProps> = ({ query, filterBy, onQueryChange, onFilterChange }) => (
  <div>
    <input type="text" placeholder="Search..." value={query} onChange={e => onQueryChange(e.target.value)} />
    <select value={filterBy} onChange={e => onFilterChange(e.target.value as 'all' | 'completed' | 'active')}>
      <option value="all">All</option>
      <option value="completed">Completed</option>
      <option value="active">Active</option>
    </select>
  </div>
);

export default TodoFilter;
