import React from 'react';

type FilterType = 'all' | 'active' | 'completed';

interface Props {
  query: string;
  onQueryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClearQuery: () => void;
  onFilterChange: (value: FilterType) => void;
}

export const TodoFilter: React.FC<Props> = ({
  query,
  onQueryChange,
  onClearQuery,
  onFilterChange,
}) => (
  <form className="field has-addons" onSubmit={e => e.preventDefault()}>
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          onChange={e => onFilterChange(e.target.value as FilterType)}
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
        onChange={onQueryChange}
      />
      <span className="icon is-left">
        <i className="fas fa-search" />
      </span>

      {query && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={onClearQuery}
            aria-label="Clear search"
          />
        </span>
      )}
    </p>
  </form>
);
