import React from 'react';

import { Filter } from '../../types/Filter';

type Props = {
  filter: string;
  changeFilter: (value: Filter) => void;
  searchQuery: string;
  changeSearchQuery: (value: string) => void;
  clearSearchQuery: () => void;
};

export const TodoFilter: React.FC<Props> = ({
  filter,
  changeFilter,
  searchQuery,
  changeSearchQuery,
  clearSearchQuery,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={filter}
          onChange={(e) => changeFilter(e.target.value as Filter)}
        >
          <option value={Filter.ALL}>All</option>
          <option value={Filter.ACTIVE}>Active</option>
          <option value={Filter.COMPLETED}>Completed</option>
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
        onChange={(e) => changeSearchQuery(e.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {searchQuery.length > 0 && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={clearSearchQuery}
          />
        </span>
      )}
    </p>
  </form>
);
