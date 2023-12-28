import {
  ChangeEvent, FC, memo, useCallback,
} from 'react';
import { FilterType } from '../../types';

type Props = {
  onFilterChange: (filter: FilterType) => void,
  onQueryChange: (input: string) => void,
  queryValue: string,
};

export const TodoFilter: FC<Props> = memo(({
  onFilterChange, onQueryChange, queryValue,
}) => {
  const handleFilterChange
  = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    const selectedFilter = event.target.value as FilterType;

    return onFilterChange(selectedFilter);
  }, [onFilterChange]);

  const handleInputChange
  = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    return onQueryChange(value);
  }, [onQueryChange]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleFilterChange}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          onChange={handleInputChange}
          value={queryValue}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>
        {
          queryValue && (
            <span className="icon is-right" style={{ pointerEvents: 'all' }}>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                onClick={() => onQueryChange('')}
                data-cy="clearSearchButton"
                type="button"
                className="delete"
              />
            </span>
          )
        }
      </p>
    </form>
  );
});
