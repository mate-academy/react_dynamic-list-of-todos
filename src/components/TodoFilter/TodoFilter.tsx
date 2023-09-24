import React from 'react';
import { TodoStatus } from '../../types/Filter';

type Props = {
  query: string;
  setQuery: (value: string) => void;
  selectedStatus: TodoStatus;
  setSelectedStatus: (value: TodoStatus) => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  setQuery,
  selectedStatus,
  setSelectedStatus,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectedStatus}
            onChange={event => (
              setSelectedStatus(event.target.value as TodoStatus)
            )}
          >
            {(Object.keys(TodoStatus) as Array<keyof typeof TodoStatus>)
              .map((key) => (
                <option value={TodoStatus[key]}>
                  {key}
                </option>
              ))}
            {/* <option value={Filter.ALL}>All</option>
            <option value={Filter.ACTIVE}>Active</option>
            <option value={Filter.COMPLETED}>Completed</option> */}
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
          onChange={event => setQuery(event.target.value)}
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
              onClick={() => setQuery('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
