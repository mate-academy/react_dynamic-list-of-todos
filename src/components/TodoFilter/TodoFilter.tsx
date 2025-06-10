import React, { Dispatch, SetStateAction } from 'react';

import { Todo } from '../../types/Todo';
const STATUS_VALUE_TEXT_MAPPING = {
  all: 'All',
  active: 'Active',
  completed: 'Completed',
} as const;

export type StatusFilter = keyof typeof STATUS_VALUE_TEXT_MAPPING;

interface ToDoFilterProps {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  status: StatusFilter;
  setStatus: Dispatch<SetStateAction<StatusFilter>>;
  onFilter: (filterBy: StatusFilter) => void;
}

export const TodoFilter = ({
  query,
  setQuery,
  status,
  setStatus,
}: ToDoFilterProps) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
              setStatus(event.target.value as StatusFilter)
            }
          >
            {Object.entries(STATUS_VALUE_TEXT_MAPPING).map(([value, text]) => (
              <option key={value} value={value}>
                {text}
              </option>
            ))}
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
          onChange={event => setQuery(event.target.value.trimStart())}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query !== '' && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setQuery('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
