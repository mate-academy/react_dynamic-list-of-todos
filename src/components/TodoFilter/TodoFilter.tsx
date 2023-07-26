import React from 'react';
import { Completion } from '../../types/Completion';

type Props = {
  query: string,
  setQuery: (newValue: string) => void,
  completionFilter: Completion,
  setCompletionFilter: (newValue: Completion) => void,
};

export const TodoFilter: React.FC<Props> = ({
  query,
  setQuery,
  completionFilter,
  setCompletionFilter,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={completionFilter}
          onChange={event => (
            setCompletionFilter(event.target.value as Completion)
          )}
        >
          <option value={Completion.All}>All</option>
          <option value={Completion.Active}>Active</option>
          <option value={Completion.Completed}>Completed</option>
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
        onChange={(event) => setQuery(event.target.value)}
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
