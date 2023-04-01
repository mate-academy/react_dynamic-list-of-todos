import React from 'react';

type Props = {
  selectSortBy: (sortByData: string) => void;
  searchQuery: string,
  addSearch: (searchWord: string) => void,
  clearSearch: () => void,
};

export const TodoFilter: React.FC<Props> = ({
  selectSortBy,
  searchQuery,
  addSearch,
  clearSearch,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          onChange={(element) => selectSortBy(element.target.value)}
          data-cy="statusSelect"
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
        onChange={(element) => addSearch(element.target.value)}
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
            onClick={clearSearch}
          />
        </span>
      )}
    </p>
  </form>
);
