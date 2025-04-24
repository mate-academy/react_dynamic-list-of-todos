import React from 'react';
import { FilterQuery } from '../../types/filterQuery';
import { FilterStatus } from '../../types/filterStatus';

interface Props {
  filterQuery: FilterQuery;
  setFilterQuery: (v: FilterQuery) => void;
}

function convertStringToStatus(value: string): FilterStatus {
  return (Object.values(FilterStatus) as Array<string>).includes(value)
    ? (value as FilterStatus)
    : FilterStatus.All;
}

export const TodoFilter: React.FC<Props> = ({
  filterQuery,
  setFilterQuery,
}) => {
  const handleFieldChange = (field: Partial<FilterQuery>) => {
    const newValues: FilterQuery = { ...filterQuery, ...field };

    setFilterQuery(newValues);
  };

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterQuery.status}
            onChange={event => {
              handleFieldChange({
                status: convertStringToStatus(event.target.value),
              });
            }}
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
          value={filterQuery.search}
          onChange={event => {
            handleFieldChange({ search: event.target.value });
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>
        {filterQuery.search ? (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => handleFieldChange({ search: '' })}
            />
          </span>
        ) : null}
      </p>
    </form>
  );
};
