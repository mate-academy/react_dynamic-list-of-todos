import React from 'react';
import { SelectedFilterState } from '../../types/SelectedFilterState';

type Props = {
  selectedFilter: SelectedFilterState,
  setSelectedFilter: (status: SelectedFilterState) => void,
  query: string,
  setQuery: (query: string) => void,
};

export const TodoFilter: React.FC<Props> = ({
  selectedFilter,
  setSelectedFilter,
  query,
  setQuery,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            value={selectedFilter}
            data-cy="statusSelect"
            onChange={(event) => {
              setSelectedFilter(event.target.value as SelectedFilterState);
            }}
          >
            <option value={SelectedFilterState.All}>All</option>
            <option value={SelectedFilterState.Active}>Active</option>
            <option value={SelectedFilterState.Completed}>Completed</option>
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
            setQuery(event.target.value);
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
                setQuery('');
                setSelectedFilter(SelectedFilterState.All);
              }}
            />
          </span>
        )}
      </p>
    </form>
  );
};
