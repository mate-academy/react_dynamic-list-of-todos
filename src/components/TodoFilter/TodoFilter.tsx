import React from 'react';

// Define types for the props
interface TodoFilterProps {
  onFilterByTitle: (title: string) => void;
  onFilterByStatus: (status: string) => void;
  query: string;
}

const TodoFilter: React.FC<TodoFilterProps> = ({
  onFilterByTitle,
  onFilterByStatus,
  query,
}) => {
  // Handle title change
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterByTitle(e.target.value);
  };

  // Handle status change
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterByStatus(e.target.value);
  };

  // Clear query
  const clearQuery = () => {
    onFilterByTitle('');
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleTitleChange}
        placeholder="Search todos by title"
      />
      {query && <button onClick={clearQuery}>x</button>}

      <select onChange={handleStatusChange}>
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="active">Active</option>
      </select>
    </div>
  );
};

export default TodoFilter;
