import React from 'react';
import { CompletedStatus } from '../../types/CompletedStatus';

type Props = {
  completedStatus: CompletedStatus;
  onSelect: (status: CompletedStatus) => void;
  query: string;
  onChange: (newQuery: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  completedStatus,
  onSelect = () => {},
  query,
  onChange = () => {},
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={completedStatus}
          onChange={e => {
            onSelect(e.target.value as CompletedStatus);
          }}
        >
          <option value={CompletedStatus.All}>All</option>
          <option value={CompletedStatus.Active}>Active</option>
          <option value={CompletedStatus.Completed}>Completed</option>
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
        onChange={e => {
          onChange(e.target.value);
        }}
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
            onClick={() => {
              onChange('');
            }}
          />
        </span>
      )}
    </p>
  </form>
);
