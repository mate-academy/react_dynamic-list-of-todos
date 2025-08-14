import React from 'react';
import { FILTER_STATUSES, FilterStatus } from '../../types/filterStatus';

type Props = {
  value: string;
  onSelect: (status: FilterStatus) => void;
  search: string;
  onSearch: (query: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  value,
  onSelect,
  search,
  onSearch,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={value}
          onChange={event => onSelect(event.target.value as FilterStatus)}
        >
          <option value={FILTER_STATUSES.ALL}>All</option>
          <option value={FILTER_STATUSES.ACTIVE}>Active</option>
          <option value={FILTER_STATUSES.COMPLETED}>Completed</option>
        </select>
      </span>
    </p>

    <p className="control is-expanded has-icons-left has-icons-right">
      <input
        data-cy="searchInput"
        type="text"
        className="input"
        placeholder="Search..."
        value={search}
        onChange={event => onSearch(event.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {search && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => onSearch('')}
          />
        </span>
      )}
    </p>
  </form>
);
