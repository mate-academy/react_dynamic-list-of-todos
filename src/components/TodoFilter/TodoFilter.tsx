import React from 'react';
import { SortKeys } from '../../enum';

type Props = {
  filter: string;
  onFilter: (value: string) => void;
  select: SortKeys,
  onSelect: (value: SortKeys) => void;
};

export const TodoFilter: React.FC<Props> = React.memo(({
  filter,
  onFilter,
  select,
  onSelect,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={select}
          onChange={event => onSelect(event.target.value as SortKeys)}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </span>
    </p>

    <p className="control is-expanded has-icons-left has-icons-right">
      <input
        value={filter}
        onChange={event => onFilter(event.target.value as SortKeys)}
        data-cy="searchInput"
        type="text"
        className="input"
        placeholder="Search..."
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>
      {filter && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => {
              onFilter('');
            }}
          />
        </span>
      )}
    </p>
  </form>
));
