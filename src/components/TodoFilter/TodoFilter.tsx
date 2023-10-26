/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Status } from '../../types/Status';

interface Props {
  query: string;
  onQueryChange: (string: string) => void;
  onStatusChange: (status: Status) => void;
}

export const TodoFilter: React.FC<Props> = ({
  query,
  onQueryChange,
  onStatusChange,
}) => {
  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onStatusChange(event.target.value as Status);
  };

  return (
    <form
      className="field has-addons"
      onSubmit={(event) => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            onChange={handleSelectChange}
            data-cy="statusSelect"
          >
            <option
              value={Status.ALL}
            >
              All
            </option>
            <option
              value={Status.ACTIVE}
            >
              Active
            </option>
            <option
              value={Status.COMPLETED}
            >
              Completed
            </option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          onChange={handleQueryChange}
          value={query}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {query && (
            <button
              onClick={() => onQueryChange('')}
              data-cy="clearSearchButton"
              type="button"
              className="delete"
            />
          )}
        </span>
      </p>
    </form>
  );
};
