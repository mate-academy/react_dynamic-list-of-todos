import React from 'react';

interface Props {
  searchQuery: string;
  todosFilter: string;
  onSearchQueryChange: (searchQuery: string) => void;
  onTodosFilterChange: (todosFilter: string) => void;
}
export const TodoFilter: React.FC<Props> = ({
  searchQuery,
  todosFilter,
  onSearchQueryChange,
  onTodosFilterChange,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={todosFilter}
            onChange={(event) => {
              onTodosFilterChange(event.target.value);
            }}
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
          onChange={(event) => {
            onSearchQueryChange(event.target.value);
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {searchQuery && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => {
                onSearchQueryChange('');
              }}
            />
          </span>
        )}
      </p>
    </form>
  );
};
