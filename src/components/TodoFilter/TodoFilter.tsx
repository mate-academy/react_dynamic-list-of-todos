import React from 'react';
import { Filter } from '../../types/EnumFilter';

type Props = {
  status: string;
  query: string;
  onStatusChanged: (status: string) => void;
  onQueryChanged: (query: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  status,
  query,
  onStatusChanged,
  onQueryChanged,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={status}
          onChange={event => onStatusChanged(event.target.value)}
        >
          <option value={Filter.all}>All</option>
          <option value={Filter.active}>Active</option>
          <option value={Filter.completed}>Completed</option>
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
        onChange={event => onQueryChanged(event.target.value)}
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
            onClick={() => onQueryChanged('')}
          />
        )}
      </span>
    </p>
  </form>
);
