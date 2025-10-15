import React from 'react';

type Props = {
  onFilterChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onQueryClear: () => void;
  filteringOption: string;
  query: string;
};

export const TodoFilter: React.FC<Props> = ({
  onFilterChange,
  onInputChange,
  onQueryClear,
  filteringOption,
  query,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          onChange={onFilterChange}
          value={filteringOption}
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
        onChange={onInputChange}
        value={query}
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
            onClick={onQueryClear}
          />
        </span>
      )}
    </p>
  </form>
);
