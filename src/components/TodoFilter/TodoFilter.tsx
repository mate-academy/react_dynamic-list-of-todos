import React, { useCallback } from 'react';
export type FilterOptions = 'all' | 'active' | 'completed';

type Props = {
  query: string;
  selectedOption: FilterOptions;
  setQuery: (query: string) => void;
  onFilterChange: (filter: FilterOptions) => void;
};

export const TodoFilter = React.memo<Props>(
  ({ query, selectedOption, setQuery, onFilterChange }) => {
    const handleButtonReset = useCallback(() => {
      setQuery('');
      onFilterChange('all');
    }, []);

    const handleSelectOption = useCallback(
      (event: React.ChangeEvent<HTMLSelectElement>) => {
        onFilterChange(event.target.value as FilterOptions);
      },
      [],
    );

    const handleInputSearch = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
      },
      [],
    );

    return (
      <form className="field has-addons">
        <p className="control">
          <span className="select">
            <select
              value={selectedOption}
              data-cy="statusSelect"
              onChange={handleSelectOption}
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </span>
        </p>

        <p className="control is-expanded has-icons-left has-icons-right">
          <input
            value={query}
            data-cy="searchInput"
            type="text"
            className="input"
            placeholder="Search..."
            onChange={handleInputSearch}
          />
          <span className="icon is-left">
            <i className="fas fa-magnifying-glass" />
          </span>

          {query && (
            <span className="icon is-right" style={{ pointerEvents: 'all' }}>
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={handleButtonReset}
              />
            </span>
          )}
        </p>
      </form>
    );
  },
);

TodoFilter.displayName = 'TodoFilter';
