import React from 'react';

type TodoFilterProps = {
  searchQuery: string;
  onFilter: (term: string) => void;
  onResetSearch: () => void;
  sortOptionChange: (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => void;
};

export const TodoFilter: React.FC<TodoFilterProps> = (
  {
    onFilter,
    onResetSearch,
    sortOptionChange,
    searchQuery,
  },
) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={sortOptionChange}
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
          value={searchQuery}
          onChange={e => onFilter(e.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {searchQuery && (
            <button
              data-cy="clearSearchButton"
              aria-label="Clear Search"
              type="button"
              className="delete"
              onClick={onResetSearch}
            />
          )}

        </span>
      </p>
    </form>
  );
};
