import React from 'react';
import { Status } from '../../types/Status';

interface Props {
  selectChanger: (val: Status) => void,
  queryChanger: (val: string) => void
  select: string;
  query: string;
}

export const TodoFilter: React.FC<Props> = ({
  select,
  query,
  selectChanger,
  queryChanger,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={select}
            onChange={(event) => selectChanger(event.target.value as Status)}
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
          onChange={(event) => queryChanger(`${event.target.value}`)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query && (
            <button
              aria-label="Close"
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => queryChanger('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
