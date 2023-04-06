import React, { useCallback } from 'react';
import { FilterType } from '../../types/FilterType';

type Props = {
  filterType: FilterType;
  onChangeFilterType: (filterType: FilterType) => void;
  query: string;
  onChangeQuery: (value: string) => void;
};

export const TodoFilter: React.FC<Props> = React.memo(({
  onChangeFilterType,
  filterType,
  query,
  onChangeQuery,
}) => {
  const handleFilterTypeSelect = useCallback((
    event: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    const { value } = event.target;

    switch (value) {
      case FilterType.ACTIVE:
        onChangeFilterType(FilterType.ACTIVE);
        break;

      case FilterType.COMPLETED:
        onChangeFilterType(FilterType.COMPLETED);
        break;

      case FilterType.ALL:
      default:
        onChangeFilterType(FilterType.ALL);
    }
  }, []);

  const handleInputChange = useCallback((
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const { value } = event.target;

    onChangeQuery(value);
  }, []);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterType}
            onChange={handleFilterTypeSelect}
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

        {query
          && (
            <span className="icon is-right" style={{ pointerEvents: 'all' }}>
              <button
                aria-label="clear-search-button"
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={() => onChangeQuery('')}
              />
            </span>
          )}
      </p>
    </form>
  );
});
