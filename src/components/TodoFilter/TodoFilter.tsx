import React, { Dispatch, SetStateAction } from 'react';
import { Status } from '../../types/Status';

type Props = {
  changeStatus: Dispatch<SetStateAction<Status>>,
  changeQuery: Dispatch<SetStateAction<string>>,
  query: string,
};

export const TodoFilter: React.FC<Props> = ({
  changeStatus,
  changeQuery,
  query,
}) => {
  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    changeStatus(event.target.value as Status);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    changeQuery(event.target.value.trimStart());
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleStatusChange}
          >
            <option value={Status.All}>All</option>
            <option value={Status.Active}>Active</option>
            <option value={Status.Completed}>Completed</option>
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
          onChange={handleQueryChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable jsx-a11y/control-has-associated-label */}
          {query && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => changeQuery('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
