import React, { useState } from 'react';
import { Status } from '../../utils/Status';

type Props = {
  status: Status;
  onSelect: (val: Status) => void;
  query: string;
  onQuery: (val: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  status,
  onSelect,
  query,
  onQuery,
}) => {
  const [isVisibleDelete, setIsVisibleDelete] = useState(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    onQuery(e.target.value);
    if (!e.target.value) {
      setIsVisibleDelete(false);
    } else {
      setIsVisibleDelete(true);
    }
  };

  const handleDelete = () => {
    setIsVisibleDelete(false);
    onQuery('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={e => onSelect(+e.target.value)}
          >
            <option value={Status.all}>All</option>
            <option value={Status.active}>Active</option>
            <option value={Status.completed}>Completed</option>
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
          onChange={handleInput}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {isVisibleDelete && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleDelete}
            />
          </span>
        )}
      </p>
    </form>
  );
};
