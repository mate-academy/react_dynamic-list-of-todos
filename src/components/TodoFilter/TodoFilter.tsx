import React from "react";

interface Props {
  completedFilter: string;
  searchQuery: string;
  onFilter: (filter: string) => void;
  onSearchQuery: (searchQuery: string) => void;
  onAppliedSearchQuery: (appliedSearchQuery: string) => void;
}

export const TodoFilter = React.memo(({
  completedFilter,
  searchQuery,
  onFilter,
  onSearchQuery,
  onAppliedSearchQuery,
}: Props) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={completedFilter}
            onChange={(event) => onFilter(event.target.value)}
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
          onChange={({ target }) => {
            onSearchQuery(target.value);
            onAppliedSearchQuery(target.value);
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
                onSearchQuery('');
                onAppliedSearchQuery('');
              }}
            />
          </span>
        )}
      </p>
    </form>
  );
});
