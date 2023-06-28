import React from 'react';

import { FilterStatus } from '../../types/FilterStatus';

interface Props {
  query: string;
  status: FilterStatus;
  onChangeQuery: (value: string) => void;
  onSelectFilter: (filterStatus: FilterStatus) => void;
}

export const TodoFilter: React.FC<Props> = ({
  query,
  status,
  onChangeQuery,
  onSelectFilter,
}) => {
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleQueryChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    onChangeQuery(event.target.value);
  };

  const handleFilterStatusChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    onSelectFilter(event.target.value as FilterStatus);
  };

  const handleClearButtonClick = () => onChangeQuery('');

  return (
    <form
      className="field has-addons"
      onSubmit={handleFormSubmit}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={handleFilterStatusChange}
          >
            {Object.values(FilterStatus).map((todoStatus) => (
              <option key={todoStatus} value={todoStatus}>
                {todoStatus.charAt(0).toUpperCase() + todoStatus.slice(1)}
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
          onChange={handleQueryChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              aria-label="clear"
              onClick={handleClearButtonClick}
            />
          )}
        </span>
      </p>
    </form>
  );
};
