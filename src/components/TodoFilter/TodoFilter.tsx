import React from 'react';
import { FilterValues } from '../../types/FilterValues';

type Props = {
  query: string,
  setQuery: (query: string) => void,
  filter: string,
  setFilter: (filter: FilterValues) => void,
};

export const TodoFilter: React.FC<Props> = ({
  query,
  setQuery,
  filter,
  setFilter,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            name="filterSelector"
            data-cy="statusSelect"
            value={filter}
            onChange={(event => {
              setFilter(event.target.value as FilterValues);
            })}
          >
            <option value={FilterValues.All}>All</option>
            <option value={FilterValues.Active}>Active</option>
            <option value={FilterValues.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          name="queryInput"
          className="input"
          placeholder="Search..."
          value={query}
          onChange={(event => {
            setQuery(event.target.value);
          })}
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
                setQuery('');
              }}
            />
          </span>
        )}
      </p>
    </form>
  );
};
