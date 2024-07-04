import React from 'react';
import { FilterStatus } from '../../App';

type Props = {
  filterStatus: FilterStatus;
  setFilterStatus: (filterStatus: FilterStatus) => void;
  query: string;
  setQuery: (query: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  filterStatus,
  setFilterStatus,
  query,
  setQuery,
}) => {
  function handleFilterStatus(event: React.ChangeEvent<HTMLSelectElement>) {
    setFilterStatus(event.target.value as FilterStatus);
  }

  function handleQuery(event: React.ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
  }

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterStatus}
            onChange={handleFilterStatus}
          >
            {Object.values(FilterStatus).map(value => (
              <option key={value} value={value}>
                {value}
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
          onChange={handleQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {query !== '' && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setQuery('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
