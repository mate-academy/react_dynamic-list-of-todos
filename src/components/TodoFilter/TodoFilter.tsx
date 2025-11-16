import React, { FC, useCallback } from 'react';
import { TodoStatus } from '../../types/TodoStatus';

interface Props {
  query: string;
  onChangeQuery: (value: string) => void;
  status: TodoStatus;
  onChangeStatus: (value: TodoStatus) => void;
}

export const TodoFilter: FC<Props> = React.memo(function TodoFilter({
  query,
  onChangeQuery,
  status,
  onChangeStatus,
}) {
  const handleChangeQuery = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChangeQuery(event.target.value);
    },
    [onChangeQuery],
  );

  const handleChangeStatus = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      onChangeStatus(event.target.value as TodoStatus);
    },
    [onChangeStatus],
  );

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={handleChangeStatus}
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
          onChange={handleChangeQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query !== '' && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => onChangeQuery('')}
            />
          </span>
        )}
      </p>
    </form>
  );
});
