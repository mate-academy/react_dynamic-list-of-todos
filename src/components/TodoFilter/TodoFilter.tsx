import React, { useCallback } from 'react';
import { FilterBy } from '../../types/Filter';

type Props = {
  query: string;
  onChangeQuery: (query: string) => void
  onChangeFilter: (filterByOption: FilterBy) => void
};

export const TodoFilter: React.FC<Props> = ({
  query,
  onChangeQuery,
  onChangeFilter,
}) => {
  const selectOption = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      switch (event.target.value) {
        case FilterBy.All:
          onChangeFilter(FilterBy.All);
          break;

        case FilterBy.Completed:
          onChangeFilter(FilterBy.Completed);
          break;

        case FilterBy.Active:
          onChangeFilter(FilterBy.Active);
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
            {Object.values(FilterBy).map(currentType => (
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
