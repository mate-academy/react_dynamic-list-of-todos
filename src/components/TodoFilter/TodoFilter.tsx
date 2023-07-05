import React from 'react';

import { FilterStatus } from '../../types/FilterStatus';

type Props = {
  query: string;
  handleInput: (query: string) => void;
  setFilterStatus: (status: FilterStatus) => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  handleInput,
  setFilterStatus,
}) => {
  const handleFilterStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterStatus(event.target.value as FilterStatus);
  };

  const handleClear = () => {
    handleInput('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleFilterStatus}>
            <option value={FilterStatus.ALL}>All</option>
            <option value={FilterStatus.ACTIVE}>Active</option>
            <option value={FilterStatus.COMPLETED}>Completed</option>
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
          onChange={(event) => handleInput(event.target.value)}
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
            />
          </span>
        )}
      </p>
    </form>
  );
};
