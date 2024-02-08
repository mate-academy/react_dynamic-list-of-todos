/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Status } from '../../types/Status';
import { FilterParams } from '../../types/FilterParams';

type Props = {
  filterParams: FilterParams,
  setFilterParams: React.Dispatch<React.SetStateAction<FilterParams>>,
};

export const TodoFilter: React.FC<Props> = React.memo(({
  filterParams,
  setFilterParams = () => {},
}) => {
  const { query, status } = filterParams;

  const handleChangeStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterParams(params => ({
      ...params,
      status: event.target.value as Status,
    }));
  };

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterParams(params => ({
      ...params,
      query: event.target.value,
    }));
  };

  const handleResetQuery = () => {
    setFilterParams(params => ({
      ...params,
      query: '',
    }));
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={handleChangeStatus}
          >
            <option value={Status.All}>All</option>
            <option value={Status.Active}>Active</option>
            <option value={Status.Completed}>Completed</option>
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
          onChange={handleChangeQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span
            className="icon is-right"
            style={{ pointerEvents: 'all' }}
          >
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleResetQuery}
            />
          </span>
        )}
      </p>
    </form>
  );
});
