import React from 'react';
import { SelectStatus } from '../../types/SelectStatus';
import { FilterParams } from '../../types/FilterParams';

interface Props {
  filterParsms: FilterParams;
  setFilterParams: React.Dispatch<React.SetStateAction<FilterParams>>;
}

export const TodoFilter: React.FC<Props> = ({
  filterParsms,
  setFilterParams,
}) => {
  const handlerSetStatusSelect = (evt: React.ChangeEvent<HTMLSelectElement>) =>
    setFilterParams(params => ({
      ...params,
      status: evt.target.value as SelectStatus,
    }));

  const handlerSetQuery = (evt: React.ChangeEvent<HTMLInputElement>) =>
    setFilterParams(params => ({ ...params, query: evt.target.value }));

  const handlerResetQuery = () =>
    setFilterParams(params => ({
      ...params,
      query: '',
    }));

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handlerSetStatusSelect}
            defaultValue={SelectStatus.ALL}
          >
            <option value={SelectStatus.ALL}>All</option>
            <option value={SelectStatus.ACTIVE}>Active</option>
            <option value={SelectStatus.COMPLETED}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={filterParsms.query}
          onChange={handlerSetQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {filterParsms.query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              aria-label="clear search input"
              onClick={handlerResetQuery}
            />
          </span>
        )}
      </p>
    </form>
  );
};
