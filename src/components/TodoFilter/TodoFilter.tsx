import React from 'react';
import { SortBy } from '../../types/types';

type Props = {
  getQuery: (arg: string) => void;
  query: string;
  getSortBy: (arg: SortBy) => void;
};

const mapGetSortBy = (sortBy: string): SortBy => {
  switch (sortBy) {
    case 'completed':
      return SortBy.Completed;

    case 'active':
      return SortBy.Active;

    case 'all':
      return SortBy.All;

    default:
      return SortBy.All;
  }
};

export const TodoFilter: React.FC<Props> = ({ getQuery, query, getSortBy }) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          onChange={e => getSortBy(mapGetSortBy(e.target.value))}
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
        value={query}
        onChange={e => getQuery(e.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {query && (
        <span className="icon is-right btn-icon">
          <button
            data-cy="clearSearchButton"
            aria-label="clear search"
            type="button"
            className="delete"
            onClick={() => getQuery('')}
          />
        </span>
      )}
    </p>
  </form>
);
