import React from 'react';

interface Props {
  stateChanger: (select: string, input: string) => void,
  status: string;
  query: string;
}
export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export const TodoFilter: React.FC<Props> = ({
  status,
  query,
  stateChanger,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={(event) => {
              stateChanger('select', `${event.target.value}`);
            }}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
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
          onChange={(event) => stateChanger('input', `${event.target.value}`)}
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
              onClick={() => stateChanger('input', '')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
