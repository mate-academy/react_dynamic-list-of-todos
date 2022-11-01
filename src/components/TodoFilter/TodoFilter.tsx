import React from 'react';
import { SortTypes } from '../../types/SortTypes';

type Props = {
  handleQuery: (value: string) => void,
  query: string,
  sortBy: SortTypes,
  handleSortType: (event: any) => void,
};

export const TodoFilter:React.FC<Props> = ({
  handleQuery,
  query,
  sortBy,
  handleSortType,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={sortBy}
          onChange={handleSortType}
        >
          <option value={SortTypes.All}>All</option>
          <option value={SortTypes.Active}>Active</option>
          <option value={SortTypes.Completed}>Completed</option>
        </select>
      </span>
    </p>

    <p className="control is-expanded has-icons-left has-icons-right">
      <input
        data-cy="searchInput"
        type="text"
        className="input"
        placeholder="Search..."
        value={query}
        onChange={event => handleQuery(event.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {query && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => handleQuery('')}
          />
        </span>
      )}
    </p>
  </form>
);
