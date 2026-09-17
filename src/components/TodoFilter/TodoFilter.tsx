import React from 'react';
import cn from 'classnames';

type Props = {
  query: string;
  onQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  status: string;
  onStatusChange: (status: string) => void;
  onClearQuery: () => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  onQueryChange,
  status,
  onStatusChange,
  onClearQuery,
}) => (
  <form className="field has-addons" onSubmit={event => event.preventDefault()}>
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={status}
          onChange={event => onStatusChange(event.target.value)}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </span>
    </p>

    <p className={cn('control is-expanded has-icons-left has-icons-right')}>
      <input
        data-cy="searchInput"
        type="text"
        className="input"
        placeholder="Search..."
        value={query}
        onChange={onQueryChange}
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
            onClick={onClearQuery}
          />
        </span>
      )}
    </p>
  </form>
);
