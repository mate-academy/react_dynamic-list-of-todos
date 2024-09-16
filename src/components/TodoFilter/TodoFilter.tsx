import React from 'react';
import cn from 'classnames';

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
          {Object.values(Status).map(status => (
            <option key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
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
        value={currentQuery}
        onChange={onSetQuery}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {currentQuery && (
        <span className={cn('icon', 'is-right', 'pointer-events-all')}>
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
