import React from 'react';

interface Props {
  query: string;
  onQueryChange: (query: string) => void;
  onQueryReset: () => void;
  selectedFilter: string;
  onFilterSelect: (filter: string) => void;
}

export const TodoFilter: React.FC<Props> = ({
  query,
  onQueryChange,
  onQueryReset,
  selectedFilter,
  onFilterSelect,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectedFilter}
            onChange={(event) => onFilterSelect(event.target.value)}
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
          onChange={(event) => onQueryChange(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query.length && (
            // eslint-disable-next-line jsx-a11y/control-has-associated-label
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={onQueryReset}
            />
          )}
        </span>
      </p>
    </form>
  );
};
