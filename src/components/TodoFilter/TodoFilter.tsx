import React from 'react';
import { SortTypes } from '../../types/SortTypes';

type Props = {
  onQuery: (value: string) => void,
  query: string,
  sortBy: SortTypes,
  onSortType: (type: React.ChangeEvent<HTMLSelectElement>) => void,
};

export const TodoFilter:React.FC<Props> = ({
  onQuery,
  query,
  sortBy,
  onSortType,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={sortBy}
          onChange={event => onSortType(event)}
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
        onChange={event => onQuery(event.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {query && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            aria-label="delete-button"
            onClick={() => onQuery('')}
          />
        </span>
      )}
    </p>
  </form>
);
