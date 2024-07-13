import React from 'react';

type Props = {
  filterStatus: string;
  onFilterStatus: (status: string) => void;
  query: string;
  onQuery: (query: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  filterStatus,
  onFilterStatus,
  query,
  onQuery,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={filterStatus}
          onChange={event => onFilterStatus(event.target.value)}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </span>
    </p>

    <p className="control is-expanded has-icons-left has-icons-right">
      <input
        value={query}
        onChange={event => onQuery(event.target.value)}
        data-cy="searchInput"
        type="text"
        className="input"
        placeholder="Search..."
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {query && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
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
