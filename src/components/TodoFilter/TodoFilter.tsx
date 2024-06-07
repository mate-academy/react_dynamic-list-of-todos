import { useCallback, useState } from 'react';
import React from 'react';
import debounce from 'lodash.debounce';
import { TodoStatus } from '../../types/TodoStatus';

type Props = {
  setAppliedQuery: (arg: string) => void;
  appliedQuery: string;
  selectedStatus: TodoStatus;
  setSelectedStatus: (arg: TodoStatus) => void;
};

export const TodoFilter: React.FC<Props> = ({
  setAppliedQuery,
  appliedQuery,
  setSelectedStatus,
  selectedStatus,
}) => {
  const [query, setQuery] = useState('');

  const applyQuery = useCallback(
    (arg: string) => debounce(setAppliedQuery, 1000)(arg),
    [setAppliedQuery],
  );

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    applyQuery(event.target.value);
  };

  const handleQueryDelete = () => {
    setQuery('');
    setAppliedQuery('');
  };

  const handleSelectedStatus = (value: string) => {
    const enumKey = value as keyof typeof TodoStatus;
    const status = TodoStatus[enumKey];

    setSelectedStatus(status);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectedStatus}
            onChange={e => handleSelectedStatus(e.target.value)}
          >
            <option value={TodoStatus.all}>All</option>
            <option value={TodoStatus.active}>Active</option>
            <option value={TodoStatus.completed}>Completed</option>
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
          onChange={handleQueryChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {appliedQuery && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleQueryDelete}
            />
          )}
        </span>
      </p>
    </form>
  );
};
