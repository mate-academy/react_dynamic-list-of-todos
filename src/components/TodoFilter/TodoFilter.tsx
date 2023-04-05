import React, { useCallback } from 'react';
import { SortType } from '../../types/SortType';

type Props = {
  query: string,
  onChangeSortType: (value: SortType) => void;
  onChangeQuery: (value: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  onChangeSortType,
  onChangeQuery,
}) => {
  const handleSelectChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      switch (event.target.value) {
        case SortType.All:
          onChangeSortType(SortType.All);
          break;

        case SortType.Active:
          onChangeSortType(SortType.Active);
          break;

        case SortType.Completed:
          onChangeSortType(SortType.Completed);
          break;

        default:
          break;
      }
    }, [],
  );

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select is-black">
          <select
            data-cy="statusSelect"
            onChange={handleSelectChange}
          >
            {Object.values(SortType).map(current => (
              <option value={current}>
                {`${current[0].toUpperCase() + current.slice(1)}`}
              </option>
            ))}
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input is-black"
          placeholder="Search..."
          value={query}
          onChange={(event) => onChangeQuery(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
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
};
