import React from 'react';
import { Status } from '../../types/Status';

type Props = {
  currentQuery: string;
  onSetQuery: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClearQuery: () => void;
  onSelectedStatus: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const TodoFilter: React.FC<Props> = ({
  currentQuery,
  onSetQuery,
  onClearQuery,
  onSelectedStatus,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select data-cy="statusSelect" onChange={onSelectedStatus}>
          <option value={Status.All}>All</option>
          <option value={Status.Active}>Active</option>
          <option value={Status.Completed}>Completed</option>
        </select>
      </span>
    </p>

    <p className="control is-expanded has-icons-left has-icons-right">
      <input
        data-cy="searchInput"
        type="text"
        className="input"
        placeholder="Search..."
        value={currentQuery}
        onChange={onSetQuery}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {currentQuery && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={onClearQuery}
          />
        </span>
      )}
    </p>
  </form>
);
