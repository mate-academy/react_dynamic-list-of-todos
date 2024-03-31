import React from 'react';
import { Status } from '../../types/Status';
import classNames from 'classnames';

type Props = {
  query: string;
  selectedStatus: Status;
  onReset: () => void;
  onQueryChange: (event: string) => void;
  onStatusChange: (event: Status) => void;
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
          <option value={Status.all}>All</option>
          <option value={Status.active}>Active</option>
          <option value={Status.completed}>Completed</option>
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
        <span className={classNames('icon is-right', { pointerEvents: 'all' })}>
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
