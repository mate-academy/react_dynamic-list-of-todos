import React from 'react';
import { Filters } from '../../types';

type Props = {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
};

export const SearchInput:React.FC<Props> = ({
  filters,
  onFiltersChange,
}) => {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({
      ...filters,
      query: e.target.value,
    });
  };

  const handleClearSearch = () => {
    onFiltersChange({
      ...filters,
      query: '',
    });
  };

  return (
    <p className="control is-expanded has-icons-left has-icons-right">
      <input
        data-cy="searchInput"
        type="text"
        className="input"
        placeholder="Search..."
        value={filters.query}
        onChange={handleSearch}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {filters.query && (
        <span
          className="icon is-right"
          style={{ pointerEvents: 'all' }}
        >
          <button
            data-cy="clearSearchButton"
            type="button"
            aria-label="clear search"
            className="delete"
            onClick={handleClearSearch}
          />
        </span>
      )}
    </p>
  );
};
