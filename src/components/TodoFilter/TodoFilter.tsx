import React from 'react';
import { Status } from '../../types/Status';

type Props = {
  status: Status;
  query: string;
  onStatusChange: (status: Status) => void;
  onQueryChange: (search: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  status,
  query,
  onStatusChange,
  onQueryChange,
}) => {
  return (
    <form className="field has-addons" onSubmit={e => e.preventDefault()}>
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={e => onStatusChange(e.target.value as Status)}
          >
            {Object.values(Status).map(value => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
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
          onChange={e => {
            onQueryChange(e.target.value);
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {!!query && (
          <span className="icon is-right">
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => onQueryChange('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
