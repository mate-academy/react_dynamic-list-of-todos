import React from 'react';
import { CompletedStatus } from '../../types/CompletedStatus';

type Props = {
  onSetCompleted: (completedStatus: CompletedStatus) => void;
  onSetQuery: (query: string) => void;
  query: string;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  onSetQuery,
  onSetCompleted,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          onChange={event =>
            onSetCompleted(event.target.value as CompletedStatus)
          }
        >
          <option value={CompletedStatus.all}>All</option>
          <option value={CompletedStatus.active}>Active</option>
          <option value={CompletedStatus.completed}>Completed</option>
        </select>
      </span>
    </p>

    <p className="control is-expanded has-icons-left has-icons-right">
      <input
        data-cy="searchInput"
        type="text"
        className="input"
        placeholder="Search..."
        onChange={event => onSetQuery(event.target.value)}
        value={query}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {query && (
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => onSetQuery('')}
          />
        )}
      </span>
    </p>
  </form>
);
