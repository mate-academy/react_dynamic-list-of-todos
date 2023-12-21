import React from 'react';
import { FilterCase } from '../../types/Filter';

interface Props {
  query: string;
  setQuery: (v: string) => void;
  setFilterCase: (v: FilterCase) => void;
}

export const TodoFilter: React.FC<Props> = ({
  query,
  setQuery,
  setFilterCase: setFilterStatus,
}) => {
  const handleSubmitChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterStatus(e.target.value as FilterCase);
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <form className="field has-addons" onSubmit={handleSubmitChange}>
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleFilterChange}>
            <option value={FilterCase.All}>All</option>
            <option value={FilterCase.Active}>Active</option>
            <option value={FilterCase.Completed}>Completed</option>
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
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
          />
        </span>
      </p>
    </form>
  );
};
