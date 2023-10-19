import React, { useMemo } from 'react';
import { SortType } from '../../types/SortType';

interface TodoFilterProps {
  sort: SortType,
  query: string,
  onSortChange: (value: SortType) => void,
  onQueryChange: (value: string) => void,
  onReset: () => void
}

export const TodoFilter: React.FC<TodoFilterProps> = ({
  sort,
  query,
  onSortChange = () => {},
  onQueryChange = () => {},
  onReset = () => {},
}) => {
  const isDeleteActive = useMemo(() => {
    return sort !== SortType.All || query !== '';
  }, [query, sort]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            defaultValue={sort}
            onChange={event => onSortChange(event.target.value as SortType)}
          >
            <option value={SortType.All}>All</option>
            <option value={SortType.Active}>Active</option>
            <option value={SortType.Completed}>Completed</option>
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
          onChange={event => onQueryChange(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {isDeleteActive && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={onReset}
            />
          </span>
        )}
      </p>
    </form>
  );
};
