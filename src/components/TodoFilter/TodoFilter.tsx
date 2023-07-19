import React from 'react';

import { Status } from '../../types/Status';

type Props = {
  query: string;
  handleInput: (query: string) => void;
  setFilterStatus: (status: Status) => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  handleInput,
  setFilterStatus,
}) => {
  const handleFilterStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterStatus(event.target.value as Status);
  };

  const handleClear = () => {
    handleInput('');
  };

  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleInput(event.target.value);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleFilterStatus}>
            <option value={Status.ALL}>All</option>
            <option value={Status.ACTIVE}>Active</option>
            <option value={Status.COMPLETED}>Completed</option>
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
          onChange={handleFilter}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClear}
              aria-label="clear search"
            />
          </span>
        )}
      </p>
    </form>
  );
};
