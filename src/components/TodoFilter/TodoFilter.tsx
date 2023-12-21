import React from 'react';
import { Status } from '../../types/Todo';

type Props = {
  query: string,
  status: Status,
  onStatus?: (type: Status) => void,
  onSearch?: (query: string) => void
};

export const TodoFilter: React.FC<Props> = (
  {
    query,
    status = Status.ALL,
    onStatus = () => {},
    onSearch = () => {},
  },
) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={status}
          onChange={(e) => onStatus(e.target.value as Status)}
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
        onChange={(e) => onSearch(e.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {query && (
        /* eslint-disable-next-line jsx-a11y/control-has-associated-label */
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => onSearch('')}
          />
        )}
      </span>
    </p>
  </form>
);
