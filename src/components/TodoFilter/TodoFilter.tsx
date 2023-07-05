import React, { memo } from 'react';
import { FilterType } from '../../types/FilterType';

type Props = {
  query: string;
  setQuery: (searchQuery: string) => void;
  applyQuery: (searchQuery: string) => void;
  filterType: FilterType;
  setFilterType: (status: FilterType) => void;
};

export const TodoFilter: React.FC<Props> = memo(({
  query,
  setQuery,
  applyQuery,
  filterType,
  setFilterType,
}) => {
  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const normalizedQuery = event.target.value.toLowerCase().trim();

    setQuery(event.target.value);
    applyQuery(normalizedQuery);
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterType(event.target.value as FilterType);
  };

  const handleClearButton = () => {
    setQuery('');
    applyQuery('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterType}
            onChange={handleSelect}
          >
            {Object.entries(FilterType).map(([label, value]) => (
              <option
                key={label}
                value={value}
              >
                {label}
              </option>
            ))}
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
          onChange={handleQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query
            && (
              <button
                aria-label="clearSearchButton"
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={handleClearButton}
              />
            )}

        </span>
      </p>
    </form>
  );
});
