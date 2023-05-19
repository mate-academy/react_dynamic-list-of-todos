import { FC } from 'react';
import { StatusToFilter } from '../../types/Todo';

interface Props {
  statusToFilter: StatusToFilter;
  setStatusToFilter: (status: StatusToFilter) => void;
  filterQuery: string;
  setFilterQuery: (query: string) => void;
}

export const TodoFilter: FC<Props> = ({
  statusToFilter,
  setStatusToFilter,
  filterQuery,
  setFilterQuery,
}) => {
  const filteredByOptions = Object.entries(StatusToFilter);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={statusToFilter}
            onChange={(event) => setStatusToFilter(
              event.target.value as StatusToFilter,
            )}
          >
            {filteredByOptions.map(([label, value]) => {
              return (
                <option value={value} key={value}>
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
          onChange={event => setFilterQuery(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {filterQuery && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
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
