import React from 'react';
import { Status } from '../../types/Status';

type Props = {
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
  selectedStatus: Status;
  setSelectedStatus: (selectedStatus: Status) => void
};

export const TodoFilter: React.FC<Props> = ({
  searchQuery,
  setSearchQuery,
  selectedStatus,
  setSelectedStatus,
}) => {
  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleQueryReset = () => setSearchQuery('');

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectedStatus}
            onChange={event => setSelectedStatus(event.target.value as Status)}
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
          value={searchQuery}
          onChange={handleQueryChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {searchQuery && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleQueryReset}
            />

          </span>
        )}

      </p>
    </form>
  );
};
