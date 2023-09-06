import React from 'react';
import { Status } from '../../types/StatusEnum';

type Props = {
  status: Status,
  onStatusChange: (status: Status) => void,
  query: string,
  onQueryChange: (query: string) => void,
};

export const TodoFilter: React.FC<Props> = ({
  status, onStatusChange, query, onQueryChange,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={status}
          onChange={event => onStatusChange(event.target.value as Status)}
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
        value={query}
        onChange={event => onQueryChange(event.target.value)}
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
          onClick={() => onQueryChange('')}
        />
      </span>
    </p>
  </form>
);
