import React from 'react';
import { Filter } from '../../types/Filter';

type Props = {
  onFilter: (filterBy: Filter) => void;
  onInput: (newValue: string) => void;
  value: string;
};

export const TodoFilter: React.FC<Props> = React.memo(function TodoFilter({
  onFilter,
  onInput,
  value,
}) {
  function handleFilterChange(event: React.ChangeEvent<HTMLSelectElement>) {
    switch (event.target.value) {
      case 'active':
      case 'completed':
      case 'all':
        onFilter(event.target.value);
        break;
      default:
        onFilter('all');
    }
  }

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleFilterChange}>
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
          onChange={event => onInput(event.target.value)}
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
              onClick={() => onInput('')}
            />
          </span>
        )}
      </p>
    </form>
  );
});
