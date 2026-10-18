import React from 'react';
import { Status } from '../../types/Status';

type Props = {
  status: Status;
  query: string;
  onStatusChange: (status: Status) => void;
  onQuery: (name: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  status,
  query,
  onStatusChange,
  onQuery,
}) => {
  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onStatusChange(event.target.value as Status);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onQuery(event.target.value);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={handleStatusChange}
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
          onChange={handleQueryChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right">
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => onQuery('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
