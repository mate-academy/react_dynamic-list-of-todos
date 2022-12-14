import React from 'react';
import { Status } from '../../types/Status';

type Props = {
  query: string,
  selectedTodos: string,
  onChangeSelectedTodos: (selectedTodos: string) => void,
  onChangeQuery: (query: string) => void,
};

export const TodoFilter: React.FC<Props> = ({
  query,
  selectedTodos,
  onChangeSelectedTodos,
  onChangeQuery,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectedTodos}
            onChange={event => (
              onChangeSelectedTodos(event.target.value)
            )}
          >
            <option value={Status.All}>{Status.All}</option>
            <option value={Status.Active}>{Status.Active}</option>
            <option value={Status.Completed}>{Status.Completed}</option>
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
          onChange={event => onChangeQuery(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query.length > 0 && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => onChangeQuery('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
