import React from 'react';
import { Filter } from '../../types/Filter';

type Props = {
  query: string
  filterBy: string
  handleQueryChange: (v:string) => void;
  handleFilterChange: (v:Filter) => void;
};

export const TodoFilter:React.FC<Props> = React.memo(
  ({
    query,
    handleQueryChange,
    filterBy,
    handleFilterChange,
  }) => {
    return (
      <form className="field has-addons">
        <p className="control">
          <span className="select">
            <select
              data-cy="statusSelect"
              value={filterBy}
              onChange={e => handleFilterChange(e.target.value as Filter)}
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
            value={query}
            className="input"
            placeholder="Search..."
            onChange={(e) => handleQueryChange(e.target.value.trimStart())}
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
                onClick={() => handleQueryChange('')}
              />
            </span>
          )}

        </p>
      </form>
    );
  },
);
