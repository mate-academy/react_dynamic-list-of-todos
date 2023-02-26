import React, { ChangeEvent } from 'react';
import { Status } from '../../types/Status';

type Props = {
  status: string;
  onStatusChange: (value: Status) => void;
  query: string;
  onInputChange: (value: string) => void;
};

export const TodoFilter: React.FC<Props> = React.memo(
  (
    {
      status,
      onStatusChange,
      query,
      onInputChange,
    },
  ) => {
    const changeStatus = (event: ChangeEvent<HTMLSelectElement>) => {
      const { value } = event.target;

      onStatusChange(value as Status);
    };

    const setSearchString = (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;

      onInputChange(value);
    };

    return (
      <form className="field has-addons">
        <p className="control">
          <span className="select">
            <select
              data-cy="statusSelect"
              value={status}
              onChange={changeStatus}
            >
              <option value={Status.ALL}>All</option>
              <option value={Status.ACTIVE}>Active</option>
              <option value={Status.COMPLETED}>Completed</option>
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
            onChange={setSearchString}
          />
          <span className="icon is-left">
            <i className="fas fa-magnifying-glass" />
          </span>

          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            {query.length > 0 && (
              // eslint-disable-next-line jsx-a11y/control-has-associated-label
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={() => onInputChange('')}
              />
            )}
          </span>
        </p>
      </form>
    );
  },
);
