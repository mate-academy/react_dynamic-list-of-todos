import React from 'react';
import { SortByAction } from '../../types/SortByAction';

type Props = {
  query: string;
  setQuery: (value: string) => void;
  setSort: (value: SortByAction) => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  setQuery,
  setSort,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          onChange={(event) => setSort(event.target.value as SortByAction)} // Cast event.target.value to SortByAction
        >
          <option value={SortByAction.All}>All</option>
          <option value={SortByAction.Active}>Active</option>
          <option value={SortByAction.Completed}>Completed</option>
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
        onChange={event => setQuery(event.currentTarget.value)}
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
            aria-label="Clear Search"
          />
        </span>
      )}
    </p>
  </form>
);
