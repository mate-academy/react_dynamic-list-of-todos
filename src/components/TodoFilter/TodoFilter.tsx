import React from 'react';
import { SelectFilter } from '../../types/SelectFilter';

type Props = {
  query: string;
  setQuery: (query: string) => void;
  reset: () => void;
  selectFilter: SelectFilter;
  setSelectFilter: (selectFilter: SelectFilter) => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  setQuery,
  reset,
  selectFilter,
  setSelectFilter,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={selectFilter}
          onChange={({ target }) => (
            setSelectFilter(target.value as SelectFilter)
          )}
        >
          {Object.values(SelectFilter).map((filterValue) => (
            <option key={filterValue} value={filterValue}>
              {filterValue}
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
        onChange={(event) => setQuery(event.target.value)}
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
            onClick={reset}
            aria-label="clear"
          />
        </span>
      )}
    </p>
  </form>
);
