import React, { Dispatch, SetStateAction } from 'react';
import { FilterType } from '../../types/FilterType';

type Props = {
  query: string,
  setQuery: Dispatch<SetStateAction<string>>,
  filterByStatus: string,
  setFilterByStatus: Dispatch<SetStateAction<FilterType>>,
};

export const TodoFilter: React.FC<Props> = ({
  query,
  setQuery,
  filterByStatus,
  setFilterByStatus,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={filterByStatus}
          onChange={
            (event) => setFilterByStatus(event.target.value as FilterType)
          }
        >
          <option value={FilterType.All}>All</option>
          <option value={FilterType.Active}>Active</option>
          <option value={FilterType.Completed}>Completed</option>
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
        onChange={(event) => setQuery(event.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {query && (
        <span className="icon is-right queryIcon">
          <button
            aria-label="clearSearchButton"
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
