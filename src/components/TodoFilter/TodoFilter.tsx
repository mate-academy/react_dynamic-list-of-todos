import React from 'react';
import { FilterStatus } from '../../App';

type Props = {
  filterStatus: FilterStatus;
  setFilterStatus: (filterStatus: FilterStatus) => void;
  query: string;
  setQuery: (query: string) => void;
};

const options = ['All', 'Active', 'Completed'];

export const TodoFilter: React.FC<Props> = ({
  filterStatus,
  setFilterStatus,
  query,
  setQuery,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value as FilterStatus)}
          >
            {options.map(option => (
              <option
                key={option}
                value={
                  option === 'Completed'
                    ? FilterStatus.completed
                    : option === 'Active'
                      ? FilterStatus.active
                      : FilterStatus.all
                }
              >
                {option}
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
          onChange={e => setQuery(e.target.value)}
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
