import React from 'react';

interface TodoFilterProps {
  setFilterType: (filterType: string) => void;
  filterText: string;
  setFilterText: (filterText: string) => void;
}

export const TodoFilter: React.FC<TodoFilterProps> = ({
  setFilterType,
  filterText,
  setFilterText,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={event => setFilterType(event.target.value)}
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
          value={filterText}
          placeholder="Search..."
          onChange={event => setFilterText(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {filterText.length > 0 && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setFilterText('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
