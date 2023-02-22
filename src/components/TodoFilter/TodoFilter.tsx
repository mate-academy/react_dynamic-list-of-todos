import React from 'react';
import { SortBy } from '../../types/SortBy';

type Props = {
  query: string;
  sortBy: SortBy;
  handleChange: (query: string) => void;
  handleSelect: (sortBy: SortBy) => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  handleChange,
  sortBy,
  handleSelect,
}) => {
  const handleResetQuery = () => {
    handleChange('');
  };

  const handleSortBy = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    handleSelect(value as SortBy);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={sortBy}
            onChange={handleSortBy}
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

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query && (
            <button
              aria-label="delete"
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleResetQuery}
            />
          )}
        </span>
      </p>
    </form>
  );
};
