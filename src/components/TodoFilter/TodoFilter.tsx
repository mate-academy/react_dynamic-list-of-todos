import React, { memo, useRef } from 'react';
import { Status } from '../../types/Status';

type Props = {
  status: Status;
  query: string;
  onStatusChange: (status: Status) => void;
  onQueryChange: (query: string) => void;
};

const TodoFilterComponent: React.FC<Props> = ({
  status,
  query,
  onStatusChange,
  onQueryChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handlerClear = () => {
    onQueryChange('');
    inputRef.current?.focus();
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={e => onStatusChange(e.target.value as Status)}
          >
            <option value={Status.All}>All</option>
            <option value={Status.Active}>Active</option>
            <option value={Status.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          ref={inputRef}
          data-cy="searchInput"
          type="text"
          className="input"
          value={query}
          onChange={e => onQueryChange(e.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handlerClear}
            />
          </span>
        )}
      </p>
    </form>
  );
};

export const TodoFilter = memo(TodoFilterComponent);
