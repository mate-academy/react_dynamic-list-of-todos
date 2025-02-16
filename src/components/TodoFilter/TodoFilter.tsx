import React, { ChangeEvent } from 'react';

interface TodoFilterProps {
  setSearchQuery: (query: string) => void;
  setFilterStatus: (status: string) => void;
}

export const TodoFilter: React.FC<TodoFilterProps> = ({
  setSearchQuery,
  setFilterStatus,
}) => {
  const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setFilterStatus(event.target.value);
  };

  const clearSearch = () => {
    setSearchQuery('');
    (
      document.querySelector('[data-cy="searchInput"]') as HTMLInputElement
    ).value = '';
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleStatusChange}>
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
          onChange={handleSearchInputChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={clearSearch}
          />
        </span>
      </p>
    </form>
  );
};
