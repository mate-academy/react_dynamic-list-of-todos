import React from 'react';
import { FilterEnum } from '../../types/FilterEnum';

type Props = {
  filter: FilterEnum;
  setFilter: (filter: FilterEnum) => void;
  query: string;
  setQuery: (query: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  filter,
  setFilter,
  query,
  setQuery,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={filter}
          onChange={e => setFilter(e.target.value as FilterEnum)}
        >
          <option value={FilterEnum.All}>All</option>
          <option value={FilterEnum.Active}>Active</option>
          <option value={FilterEnum.Completed}>Completed</option>
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
        onChange={e => setQuery(e.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {query.length !== 0 && (
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => setQuery('')}
          />
        )}
      </span>
    </p>
  </form>
);
