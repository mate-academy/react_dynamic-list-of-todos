import React from 'react';
import { TodoStatus } from '../../types/todoStatus';

interface Props {
  setFilterByStatus: (filterBy: TodoStatus) => void;
  setQuery: (text: string) => void;
  query: string;
}

export const TodoFilter: React.FC<Props> = ({
  setFilterByStatus,
  setQuery,
  query,
}: Props) => {
  const statusList = Object.values(TodoStatus);
  const capitalize = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={event =>
              setFilterByStatus(event.target.value as TodoStatus)
            }
          >
            {statusList.map((status: TodoStatus) => {
              return (
                <option key={status} value={status}>
                  {capitalize(status)}
                </option>
              );
            })}
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          value={query}
          onChange={event => {
            setQuery(event.target.value);
          }}
          className="input"
          placeholder="Search..."
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
