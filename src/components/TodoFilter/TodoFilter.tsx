import React from 'react';
import { FilteredBy } from '../../types/Filter';

type Props = {
  query: string,
  onChangeQuery: (query: string) => void,
  filterBy: FilteredBy,
  setFilterBy: (filterBy: FilteredBy) => void,
};

export const TodoFilter: React.FC<Props> = ({
  query,
  onChangeQuery,
  filterBy,
  setFilterBy,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={filterBy}
          onChange={({ target }) => {
            setFilterBy(target.value as FilteredBy);
          }}
        >
          <option value={FilteredBy.ALL}>
            All
          </option>

          <option value={FilteredBy.ACTIVE}>
            Active
          </option>

          <option value={FilteredBy.COMPLETED}>
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
        onChange={({ target }) => {
          onChangeQuery(target.value);
        }}
      />
      {query && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            aria-label="Delete"
            onClick={() => {
              onChangeQuery('');
            }}
          />
        </span>
      )}
    </p>
  </form>
);
