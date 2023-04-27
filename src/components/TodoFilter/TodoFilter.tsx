import React, { ChangeEvent } from 'react';
import { FilterStatus } from '../../types/FilterStatus';

type Props = {
  query: string,
  filter: FilterStatus,
  handleChange(event: ChangeEvent<HTMLInputElement>): void,
  handleReset(): void,
  handleFilterChange(event: ChangeEvent<HTMLSelectElement>): void,
};

export const TodoFilter: React.FC<Props> = (
  {
    query,
    filter,
    handleChange,
    handleReset,
    handleFilterChange,
  },
) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={filter}
          onChange={handleFilterChange}
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
        value={query}
        onChange={handleChange}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {query !== '' && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={handleReset}
          />
        </span>
      )}
    </p>
  </form>
);
