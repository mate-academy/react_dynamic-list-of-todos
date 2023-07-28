import React from 'react';
import { SelectStatus } from '../../types/selectStatus';

type Props = {
  setSelectedStatus: (value: SelectStatus) => void,
  query: string,
  setQuery: (value: string) => void,
};

export const TodoFilter: React.FC<Props> = React.memo(({
  setSelectedStatus,
  query,
  setQuery,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(event) => {
              setSelectedStatus(event.target.value as SelectStatus);
            }}
          >
            <option
              value={SelectStatus.all}
            >
              All
            </option>
            <option
              value={SelectStatus.active}
            >
              Active
            </option>
            <option
              value={SelectStatus.completed}
            >
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
          onChange={(event) => setQuery(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {
            query && (
              <button
                data-cy="clearSearchButton"
                type="button"
                aria-label="clear"
                className="delete"
                onClick={() => setQuery('')}
              />
            )
          }

        </span>
      </p>
    </form>
  );
});
