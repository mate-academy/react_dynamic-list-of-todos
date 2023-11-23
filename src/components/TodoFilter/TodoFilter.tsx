import React from 'react';
import { FilterStatus } from '../../types/FilterStatus';

type Props = {
  query: string;
  queryFilter: (query: string) => void;
  status: FilterStatus;
  statusFilter: (status: FilterStatus) => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  queryFilter,
  status,
  statusFilter,
}) => {
  const handlerStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as FilterStatus;

    statusFilter(value);
  };

  const handlerFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    queryFilter(event.target.value);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handlerStatus}
            value={status}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          onChange={handlerFilter}
          value={query}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query && (
            // eslint-disable-next-line jsx-a11y/control-has-associated-label
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => queryFilter('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
