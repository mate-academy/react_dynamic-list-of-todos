import React from 'react';
import { FilterBy } from '../../types/FilterBy';

type Props = {
  query: string,
  filterBy: FilterBy,
  onChangeQuery: (query: string) => void,
  onChangeFilterBy: (filterBy: FilterBy) => void,
};

export const TodoFilter: React.FC<Props> = React.memo(({
  query,
  filterBy,
  onChangeQuery,
  onChangeFilterBy,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={filterBy}
          onChange={({ target }) => onChangeFilterBy(target.value as FilterBy)}
        >
          <option value={FilterBy.ALL}>All</option>
          <option value={FilterBy.ACTIVE}>Active</option>
          <option value={FilterBy.COMPLETE}>Completed</option>
        </select>
      </span>
    </p>

    <p className="control is-expanded has-icons-left has-icons-right">
      <input
        data-cy="searchInput"
        type="text"
        value={query}
        className="input"
        placeholder="Search..."
        onChange={(event) => onChangeQuery(event.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {query && (
          <button
            aria-label="button"
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => onChangeQuery('')}
          />
        )}
      </span>
    </p>
  </form>
));
