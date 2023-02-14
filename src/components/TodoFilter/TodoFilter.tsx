import React from 'react';
import { SortBy } from '../../types/SortBy';

type Props = {
  query: string;
  sortBy: string;
  handleChange: (query: string) => void;
  handleSelect: (sortBy: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  handleChange,
  sortBy,
  handleSelect,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={sortBy}
          onChange={(event) => handleSelect(event.target.value)}
        >
          <option value={SortBy.All}>All</option>
          <option value={SortBy.Active}>Active</option>
          <option value={SortBy.Completed}>Completed</option>
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
        onChange={(event) => handleChange(event.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {query && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          <button
            aria-label="delete"
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => handleChange('')}
          />
        </span>
      )}
    </p>
  </form>
);
