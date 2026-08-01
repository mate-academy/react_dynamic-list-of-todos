import React from 'react';
import { Status } from '../../types/Status';

type Props = {
  status: Status;
  onStatusChange: (status: Status) => void;
  query: string;
  onQueryChange: (query: string) => void;
  onClearQuery: () => void;
};

export const TodoFilter: React.FC<Props> = ({
  status,
  onStatusChange,
  query,
  onQueryChange,
  onClearQuery,
}) => {
  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    if (value === 'all' || value === 'active' || value === 'completed') {
      onStatusChange(value);
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
          onChange={event => onQueryChange(event.target.value)}
        />

        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query.length > 0 && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              type="button"
              className="delete"
              data-cy="clearSearchButton"
              onClick={onClearQuery}
            />
          </span>
        )}
      </p>
    </form>
  );
};
