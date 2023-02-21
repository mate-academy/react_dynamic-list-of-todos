import React from 'react';
import { Status } from '../../types/Status';

type Props = {
  handleStatus: (status: Status) => void;
  handleQuery: (value: string) => void;
  status: Status,
  query: string,
};
export const TodoFilter: React.FC<Props> = (
  {
    handleStatus,
    handleQuery,
    status,
    query,
  },
) => {
  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    const enumKey = value as Status;

    handleStatus(enumKey);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={handleSelect}
          >
            <option value={Status.ALL}>
              All
            </option>
            <option value={Status.ACTIVE}>
              Active
            </option>
            <option value={Status.COMPLETED}>
              Completed
            </option>
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
          onChange={(event) => {
            handleQuery(event.target.value);
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {!!query.length && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              aria-label="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => {
                handleQuery('');
              }}
            />
          </span>
        )}
      </p>
    </form>
  );
};
