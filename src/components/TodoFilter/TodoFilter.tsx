import React from 'react';
import { TodoStatus } from '../../types/TodoStatus';

type Props = {
  handleStatus: (event: React.ChangeEvent<HTMLSelectElement>) => void,
  handleQuery: (event: React.ChangeEvent<HTMLInputElement>) => void,
  resetQuery: () => void,
  query: string | number,
  status: string,
};

export const TodoFilter: React.FC<Props> = ({
  handleStatus,
  handleQuery,
  resetQuery,
  query,
  status,
}) => {
  return (
    <form
      className="field has-addons"
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={handleStatus}
          >
            <option value={TodoStatus.ALL}>All</option>
            <option value={TodoStatus.ACTIVE}>Active</option>
            <option value={TodoStatus.COMPLETED}>Completed</option>
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
          onChange={handleQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              aria-label="clear"
              type="button"
              className="delete"
              onClick={resetQuery}
            />
          </span>
        )}
      </p>
    </form>
  );
};
