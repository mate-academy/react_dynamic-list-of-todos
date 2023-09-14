import React from 'react';
import { Filter } from '../../types/Filter';

type Props = {
  filter: string,
  setFilter: (value: Filter) => void,
  query: string,
  setQuery: React.Dispatch<React.SetStateAction<string>>,
};

export const TodoFilter: React.FC<Props> = ({
  filter,
  setFilter,
  query,
  setQuery,
}) => {
  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value as Filter);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter}
            onChange={handleFilter}
          >
            <option value={Filter.All}>
              All
            </option>
            <option value={Filter.Active}>
              Active
            </option>
            <option value={Filter.Completed}>
              Completed
            </option>
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
          onChange={handleQuery}
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
              onClick={() => setQuery('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
