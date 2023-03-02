import React from 'react';
import { FilterBy } from '../../utils/filterTodos';

type Props = {
  filterBy: FilterBy
  query: string
  getFilterField: (value: FilterBy) => void
  getQuery: (value: string) => void
  applyQuery: (value: string) => void
};
export const TodoFilter: React.FC<Props> = React.memo(
  ({
    filterBy,
    query,
    getFilterField,
    getQuery,
    applyQuery,
  }) => (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterBy}
            onChange={(event) => (
              getFilterField(event.target.value as FilterBy)
            )}
          >
            <option value={FilterBy.All}>All</option>
            <option value={FilterBy.Active}>Active</option>
            <option value={FilterBy.Completed}>Completed</option>
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
          onChange={(event) => {
            getQuery(event.target.value);
            applyQuery(event.target.value);
          }}
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
              onClick={() => {
                getQuery('');
                applyQuery('');
              }}
            />
          </span>
        )}
      </p>
    </form>
  ),
);
