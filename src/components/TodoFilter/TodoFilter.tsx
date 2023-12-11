import React from 'react';
import { Filter } from '../../types/Filter';

type Props = {
  query: string;
  onQueryChange: (query: string) => void;
  filter: Filter;
  onFilterChange: (filter: Filter) => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  onQueryChange,
  filter,
  onFilterChange,
}) => {
  const filterEntries = Object.entries(Filter);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter}
            onChange={(event) => onFilterChange(event.target.value as Filter)}
          >
            {filterEntries.map(([key, value]) => (
              <option value={value}>
                {key}
              </option>
            ))}
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
          onChange={(event) => onQueryChange(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: Filter.All }}>
          {query && (
            /* eslint-disable-next-line jsx-a11y/control-has-associated-label */
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => onQueryChange('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
