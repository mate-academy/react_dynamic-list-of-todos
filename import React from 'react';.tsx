import React from 'react';
import classNames from 'classnames';

type Props = {
  status: string;
  onStatusChange: (status: string) => void;
  query: string;
  onQueryChange: (query: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  status,
  onStatusChange,
  query,
  onQueryChange,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={status}
          title="Filter by status"
          onChange={e => onStatusChange(e.target.value)}
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
        onChange={e => onQueryChange(e.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span
        className={classNames('icon', 'is-right')}
        style={{ pointerEvents: 'all' }}
      >
        {query && (
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            title="Clear search"
            onClick={() => onQueryChange('')}
          />
        )}
      </span>
    </p>
  </form>
);
