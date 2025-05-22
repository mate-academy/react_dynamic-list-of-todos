import React from 'react';

type Props = {
  selectedFilter: 'all' | 'active' | 'completed';
  onFilterChange: (value: 'all' | 'active' | 'completed') => void;
  query: string;
  changeTitleUsedQuery: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clearQuery: () => void;
};

export const TodoFilter: React.FC<Props> = ({
  selectedFilter,
  onFilterChange,
  query,
  changeTitleUsedQuery,
  clearQuery,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={selectedFilter}
          onChange={e =>
            onFilterChange(e.target.value as 'all' | 'active' | 'completed')
          }
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
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
        onChange={changeTitleUsedQuery}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span
        className="icon is-right"
        style={{ pointerEvents: query ? 'all' : 'none' }}
      >
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        {query && (
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={clearQuery}
          />
        )}
      </span>
    </p>
  </form>
);
