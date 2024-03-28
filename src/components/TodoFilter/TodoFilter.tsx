import React from 'react';

import { Status } from '../../types/Status';

type Props = {
  query: string;
  onReset: () => void;
  onQueryChange: (event: string) => void;
  onStatusChange: (event: Status) => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  onReset,
  onQueryChange,
  onStatusChange,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={event => onStatusChange(event.target.value as Status)}
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
          value={query}
          className="input"
          placeholder="Search..."
          onChange={event => onQueryChange(event.target.value)}
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
              onClick={onReset}
            />
          </span>
        )}
      </p>
    </form>
  );
};
