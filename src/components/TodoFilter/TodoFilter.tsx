import React from 'react';
import { Status } from '../../types/Status';

type Props = {
  setStatus: (status: Status) => void;
  setQuery: (query: string) => void;
  status: Status,
  query: string,
};
export const TodoFilter: React.FC<Props> = (
  {
    setStatus,
    setQuery,
    status,
    query,
  },
) => {
  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    switch (value) {
      case Status.ALL:
        setStatus(Status.ALL);
        break;

      case Status.ACTIVE:
        setStatus(Status.ACTIVE);
        break;

      case Status.COMPLETED:
        setStatus(Status.COMPLETED);
        break;

      default:
        throw new Error('Unexpected filter type');
    }
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
            setQuery(event.target.value);
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query.length && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => {
                setQuery('');
              }}
            />
          </span>
        )}
      </p>
    </form>
  );
};
