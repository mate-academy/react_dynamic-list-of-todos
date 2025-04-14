import React from 'react';

type Props = {
  onFilterState?: (filterState: boolean | null) => void;
  onQueryChange?: (query: string) => void;
  query: string;
  onReset?: () => void;
};

export const TodoFilter: React.FC<Props> = ({
  onFilterState,
  onQueryChange,
  query,
  onReset,
}) => {
  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    if (onFilterState) {
      if (value === 'all') {
        onFilterState(null);
      } else if (value === 'completed') {
        onFilterState(true);
      } else if (value === 'active') {
        onFilterState(false);
      }
    }
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleFilterChange}>
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          id="query"
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          onChange={event => onQueryChange?.(event.target.value)}
          value={query}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {query && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={onReset}
            />
          )}
        </span>
      </p>
    </form>
  );
};
