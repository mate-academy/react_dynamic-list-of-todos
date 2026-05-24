import React from 'react';

export enum CompletedFilter {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

type Props = {
  search: string;
  completed: CompletedFilter;
  onSearchChange: (value: string) => void;
  onCompletedChange: (value: CompletedFilter) => void;
};

export const TodoFilter: React.FC<Props> = ({
  search,
  completed,
  onSearchChange,
  onCompletedChange,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={completed}
          onChange={e => onCompletedChange(e.target.value as CompletedFilter)}
        >
          <option value={CompletedFilter.All}>All</option>
          <option value={CompletedFilter.Active}>Active</option>
          <option value={CompletedFilter.Completed}>Completed</option>
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
        onChange={e => onSearchChange(e.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {search && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => onSearchChange('')}
          />
        </span>
      )}
    </p>
  </form>
);
