import React from 'react';

interface Props {
  query: string;
  status: 'all' | 'active' | 'completed';
  onQueryChange: (value: string) => void;
  onStatusChange: (value: 'all' | 'active' | 'completed') => void;
}

export const TodoFilter: React.FC<Props> = ({
  query,
  status,
  onQueryChange,
  onStatusChange,
}) => {
  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = event.target.value;

    if (
      newStatus === 'all' ||
      newStatus === 'active' ||
      newStatus === 'completed'
    ) {
      onStatusChange(newStatus);
    } else {
      console.error(`Invalid status value: ${newStatus}`); // eslint-disable-line no-console
    }
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
          onChange={e => onQueryChange(e.target.value)}
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
              onClick={() => onQueryChange('')}
              aria-label="Clear search query"
            />
          </span>
        )}
      </p>
    </form>
  );
};
