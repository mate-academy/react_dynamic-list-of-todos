import { useCallback } from 'react';
import { FilterBy } from '../../types/FIlterBy';

type Props = {
  query: string,
  onSetQuery: (input: string) => void
  onChangeFilterBy: (value: FilterBy) => void
};

export const TodoFilter: React.FC<Props> = (
  {
    query,
    onSetQuery,
    onChangeFilterBy,
  },
) => {
  const handleSelect = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      switch (event.target.value) {
        case FilterBy.All:
          onChangeFilterBy(FilterBy.All);
          break;

        case FilterBy.Active:
          onChangeFilterBy(FilterBy.Active);
          break;

        case FilterBy.Completed:
          onChangeFilterBy(FilterBy.Completed);
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
            onChange={handleSelect}
          >
            {Object.values(FilterBy).map(current => (
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
          className="input"
          placeholder="Search..."
          value={query}
          onChange={(event) => onSetQuery(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => onSetQuery('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
