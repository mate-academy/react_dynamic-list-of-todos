import React from 'react';
import { FilterStatus } from '../../types/FilterStatus';

type Props = {
  onChange: (input: string) => void;
  value: string;
  filterStatus: FilterStatus;
  onChangeFilterStatus: (input: FilterStatus) => void;
};

export const TodoFilter: React.FC<Props> = ({
  onChange,
  value,
  filterStatus,
  onChangeFilterStatus,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={filterStatus}
          onChange={event =>
            onChangeFilterStatus(event.target.value as FilterStatus)
          }
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
        value={value}
        onChange={event => onChange(event.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>
      {value && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => onChange('')}
          />
        </span>
      )}
    </p>
  </form>
);
