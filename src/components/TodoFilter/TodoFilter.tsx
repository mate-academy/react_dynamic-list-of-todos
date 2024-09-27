import React from 'react';
import { Status } from '../../types/Status';

type Props = {
  query: string;
  selectedStatus: Status;
  onReset: () => void;
  onQueryChange: (query: string) => void;
  onStatusChange: (status: Status) => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  selectedStatus,
  onReset,
  onQueryChange,
  onStatusChange,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={selectedStatus}
          onChange={event => onStatusChange(event.target.value as Status)}
        >
          {Object.entries(Status).map(([key, value]) => (
            <option key={key} value={value}>
              {key}
            </option>
          ))}
        </select>
      </span>
    </p>

    <p className="control is-expanded has-icons-left has-icons-right">
      <input
        data-cy="searchInput"
        type="text"
        value={query}
        className="input"
        placeholder="Search..."
        onChange={event => onQueryChange(event.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {query && (
        <span className="icon is-right clear-button">
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={onReset}
          />
        </span>
      )}
    </p>
  </form>
);
