import { FC } from 'react';
import { FilterType } from '../../types/Todo';

interface Props {
  statusToFilterBy: FilterType;
  setStatusToFilterBy: (status: FilterType) => void;
  filterQuery: string;
  setFilterQuery: (query: string) => void;
}

export const TodoFilter: FC<Props> = ({
  statusToFilterBy,
  setStatusToFilterBy,
  filterQuery,
  setFilterQuery,
}) => {
  const filterByOption = Object.entries(FilterType);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={statusToFilterBy}
            onChange={(event) => setStatusToFilterBy(
              event.target.value as FilterType,
            )}
          >
            {filterByOption.map(([label, value]) => (
              <option value={value} key={value}>
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
          value={filterQuery}
          onChange={(event) => setFilterQuery(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {filterQuery && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              aria-label="Clear Search Button"
              onClick={() => setFilterQuery('')}
            />
          </span>
        )}

      </p>
    </form>
  );
};
