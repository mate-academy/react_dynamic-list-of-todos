import React from 'react';
import { FilterStatus } from '../../types/Filterstatus';

type Props = {
  query: string;
  filterStatus: FilterStatus;
  onQueryChange: (query: string) => void;
  onFilterStatusChange: (status: FilterStatus) => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  filterStatus,
  onQueryChange,
  onFilterStatusChange,
}) => {
  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterStatusChange(event.target.value as FilterStatus);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };

  const handleQueryClear = () => {
    onQueryChange('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterStatus}
            onChange={handleStatusChange}
          >
            <option value={FilterStatus.All}>All</option>
            <option value={FilterStatus.Active}>Active</option>
            <option value={FilterStatus.Completed}>Completed</option>
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

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleQueryClear}
            />
          </span>
        )}
      </p>
    </form>
  );
};
