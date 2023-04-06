import React, { useCallback } from 'react';
import { SortBy } from '../../types/SortOption';

type Props = {
  query: string;
  onChangeQuery: (query: string) => void
  onChangeSort: (sortByOption: SortBy) => void
};

export const TodoFilter: React.FC<Props> = ({
  query,
  onChangeQuery,
  onChangeSort,
}) => {
  const selectOption = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      switch (event.target.value) {
        case SortBy.All:
          onChangeSort(SortBy.All);
          break;

        case SortBy.Completed:
          onChangeSort(SortBy.Completed);
          break;

        case SortBy.Active:
          onChangeSort(SortBy.Active);
          break;

        default:
          break;
      }
    }, [],
  );

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={selectOption}
          >
            {Object.values(SortBy).map(currentType => (
              <option value={currentType}>
                {`${currentType[0].toUpperCase() + currentType.slice(1)}`}
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
          value={query}
          onChange={(event) => onChangeQuery(event.target.value)}
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>
        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              aria-label="clear-button"
              data-cy="clearSearchButton"
              type="button"
              onClick={() => onChangeQuery('')}
              className="delete"
            />
          </span>
        )}
      </p>
    </form>
  );
};
