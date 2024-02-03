import React from 'react';

export enum Status {
  all = 'all',
  active = 'active',
  completed = 'completed',
}

type Props = {
  selectedStatus: Status,
  onStatusChange: (status: Status) => void
  query: string,
  onQueryChange: (query: string) => void
};

export const TodoFilter: React.FC<Props> = ({
  selectedStatus,
  onStatusChange,
  query,
  onQueryChange,
}) => {
  const handleStatusClick = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value as Status;

    onStatusChange(status);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;

    onQueryChange(newQuery);
  };

  const handleDeleteQuery = () => {
    onQueryChange('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectedStatus}
            onChange={handleStatusClick}
          >
            <option
              value={Status.all}
            >
              All
            </option>
            <option
              value={Status.active}
            >
              Active
            </option>
            <option
              value={Status.completed}
            >
              Completed
            </option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          id="searchInput" // Add an id attribute
          name="searchInput"
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
              onClick={handleDeleteQuery}
            />
          </span>
        )}

      </p>
    </form>
  );
};
