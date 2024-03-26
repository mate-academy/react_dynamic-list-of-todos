import React from 'react';
import { Status } from '../../types/Status';

type Props = {
  status: Status;
  search: string;
  onStatusChange: (status: Status) => void;
  onSearchChange: (search: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  status,
  search,
  onStatusChange,
  onSearchChange,
}) => {
  return (
    <form
      className="field has-addons"
      onSubmit={(e) => e.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={(e) => onStatusChange(e.target.value as Status)}
          >
            <option value={Status.All}>All</option>
            <option value={Status.Active}>Active</option>
            <option value={Status.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            onSearchChange(e.target.value);
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {!!search && (
          <span
            className="icon is-right"
            style={{ pointerEvents: 'all' }}
          >
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => onSearchChange('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
