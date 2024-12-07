import React, { useCallback } from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  onStatusChanged: (value: string) => void;
  onQueryChanged: (value: string) => void;
  status: string;
  query: string;
}

export const TodoFilter: React.FC<Props> = ({
  onStatusChanged,
  onQueryChanged,
  status,
  query,
}) => {
  const handleCloseButton = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      onQueryChanged('');
    },
    [onQueryChanged],
  );

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={event => onStatusChanged(event.target.value)}
            value={status}
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
          onChange={event => onQueryChanged(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query.length > 0 && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleCloseButton}
            />
          </span>
        )}
      </p>
    </form>
  );
};
