import React from 'react';

type Props = {
  filterBy: string,
  onFilterChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
  query: string,
  onChangeQuery: (e: React.ChangeEvent<HTMLInputElement>) => void,
  onClearQuery: ()=> void,
};

export const TodoFilter: React.FC<Props> = ({
  filterBy,
  onFilterChange,
  query,
  onChangeQuery,
  onClearQuery,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={filterBy}
          onChange={onFilterChange}
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
        onChange={onChangeQuery}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>

        {query && (
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            aria-label="clearQuery"
            onClick={onClearQuery}
          />
        )}
      </span>
    </p>
  </form>
);
