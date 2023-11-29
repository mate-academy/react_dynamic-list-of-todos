import { FC } from 'react';

import { FilterStatus } from '../../types/Filter';

type Props = {
  filterStatus: FilterStatus,
  setFilterStatus: (status: FilterStatus) => void,
  filterQuery: string,
  setFilterQuery: (query: string) => void,
};

export const TodoFilter: FC<Props> = ({
  filterStatus,
  setFilterStatus,
  filterQuery,
  setFilterQuery,
}) => {
  const filterByOption = Object.entries(FilterStatus);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterStatus}
            onChange={(event) => setFilterStatus(
              event.target.value as FilterStatus,
            )}
          >
            {filterByOption.map(([label, value]) => {
              return (
                <option
                  value={value}
                  key={value}
                >
                  {label}
                </option>
              );
            })}
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
          onChange={(event) => (
            setFilterQuery(event.target.value.trim().replace(/\s+/g, ' '))
          )}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {filterQuery && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              aria-label="Delete"
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setFilterQuery('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
