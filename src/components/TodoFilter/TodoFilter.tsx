import React from 'react';
import { SortBy } from '../../types/SortBy';

interface Props {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  sortBy: SortBy;
  setSortBy: React.Dispatch<React.SetStateAction<SortBy>>;
}

export const TodoFilter: React.FC<Props> = ({
  query,
  setQuery,
  sortBy,
  setSortBy,
}) => {
  const handleQueryInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const clearQueryInput = () => setQuery('');

  const handleSortBy = (event: React.ChangeEvent<HTMLSelectElement>) => {
    switch (event.target.value) {
      case SortBy.Completed:
        setSortBy(SortBy.Completed);
        break;

      case SortBy.Active:
        setSortBy(SortBy.Active);
        break;

      default:
        setSortBy(SortBy.All);
        break;
    }
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
          onChange={handleQueryInput}
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
              aria-label="Clear query"
              onClick={clearQueryInput}
            />
          )}
        </span>
      </p>
    </form>
  );
};
