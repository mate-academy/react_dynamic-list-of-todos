import React from 'react';
import { FilterType } from '../../types/FilterTypes';

type Props = {
  query: string;
  handleQuery: (query: string) => void;
  setFilterStatus: (status: FilterType) => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  handleQuery,
  setFilterStatus,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          onChange={(event) => {
            setFilterStatus(event.target.value as FilterType);
          }}
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
        onChange={(event) => handleQuery(event.target.value)}
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
            onClick={() => handleQuery('')}
          />
        </span>
      )}
    </p>
  </form>
);
