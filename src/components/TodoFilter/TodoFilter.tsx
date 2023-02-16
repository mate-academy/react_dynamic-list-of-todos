import React, { ChangeEvent, FC, useCallback } from 'react';
import { FilterType } from '../../types';

type Props = {
  query: string,
  setQuery: (query: string) => void,
  filterType: FilterType,
  setFilter: (filterType: FilterType) => void,
};

export const TodoFilter: FC<Props> = React.memo(
  ({
    query,
    filterType,
    setQuery,
    setFilter,
  }) => {
    const handleInputChange = useCallback(
      ({ target }: ChangeEvent<HTMLInputElement>) => {
        setQuery(target.value);
      }, [],
    );

    const handleClearInput = useCallback(() => {
      setQuery('');
    }, []);

    const handleSelectChange = useCallback(
      ({ target }: ChangeEvent<HTMLSelectElement>) => {
        setFilter(target.value as FilterType);
      }, [],
    );

    return (
      <form className="field has-addons">
        <p className="control">
          <span className="select">
            <select
              data-cy="statusSelect"
              value={filterType}
              onChange={handleSelectChange}
            >
              <option value={FilterType.ALL}>All</option>
              <option value={FilterType.ACTIVE}>Active</option>
              <option value={FilterType.COMPLETED}>Completed</option>
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
            onChange={handleInputChange}
          />
          <span className="icon is-left">
            <i className="fas fa-magnifying-glass" />
          </span>

          {query && (
            <span className="icon is-right" style={{ pointerEvents: 'all' }}>
              <button
                aria-label="Clear search"
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={handleClearInput}
              />
            </span>
          )}
        </p>
      </form>
    );
  },
);
