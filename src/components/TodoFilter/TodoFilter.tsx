import React, { memo } from 'react';

type Props = {
  selectedFilter: string
  searchQuery: string,
  onSelectedFilter: (selectedFilter: string) => void,
  onSearchQuery: (searchQuery: string) => void,
};

export const TodoFilter: React.FC<Props> = memo(({
  selectedFilter,
  searchQuery,
  onSelectedFilter,
  onSearchQuery,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={selectedFilter}
          onChange={(event) => {
            onSelectedFilter(event.target.value);
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
          onSearchQuery(event.target.value);
        }}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {searchQuery
        && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => onSearchQuery('')}
            />
          </span>
        )}
    </p>
  </form>
));
