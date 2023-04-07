import React, { useCallback } from 'react';

import { FilterByStatus } from '../../types/FilterByStatus';

import { statusOptions } from './options';

interface Props {
  statusFilter: FilterByStatus,
  onSelect: (selectedFilter: FilterByStatus) => void
  queryFilter: string,
  onQueryInput: (title: string) => void,
}

export const TodoFilter: React.FC<Props> = React.memo(({
  statusFilter,
  onSelect,
  queryFilter,
  onQueryInput,
}) => {
  const handleFilterSelect = useCallback((
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const selectedFilter = event.target.value as FilterByStatus;

    onSelect(selectedFilter);
  }, [onSelect]);

  const handlerFilterByQuery = useCallback((
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const query = event.target.value;

    onQueryInput(query);
  }, [onQueryInput]);

  const handleClearInputField = useCallback(() => {
    onQueryInput('');
  }, [onQueryInput]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={statusFilter}
            onChange={handleFilterSelect}
          >
            {statusOptions.map(option => {
              const { value, label } = option;

              return (
                <option
                  key={value}
                  value={value}
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
          value={queryFilter}
          onChange={handlerFilterByQuery}
        />

        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {queryFilter && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClearInputField}
              aria-label="Clear input field"
            />
          )}
        </span>
      </p>
    </form>
  );
});
