import React, { useEffect, useState } from 'react';
import { Status } from '../../types/Status';

type Props = {
  setQuery: (query: string) => void;
  status: Status;
  selectedStatus: (status: Status) => void;
};

export const TodoFilter: React.FC<Props> = ({
  setQuery,
  status,
  selectedStatus,
}) => {
  const [title, setTitle] = useState('');

  useEffect(() => {
    const queryToLowerCase = title.toLowerCase();

    setQuery(queryToLowerCase);
  }, [setQuery, title]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={event => selectedStatus(event.target.value as Status)}
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
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {title && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setTitle('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
