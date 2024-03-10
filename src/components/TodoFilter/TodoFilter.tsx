import React from 'react';
import { Filter } from '../../types/Filter';

type Props = {
  filterBy: (value: Filter) => void;
  queryFilterValue: string;
  queryFilterBy: (value: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  filterBy,
  queryFilterValue,
  queryFilterBy,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          onChange={(event) => filterBy(event.target.value as Filter)}
        >
          <option value={Filter.ALL}>All</option>
          <option value={Filter.ACTIVE}>Active</option>
          <option value={Filter.COMPLETED}>Completed</option>
        </select>
      </span>
    </p>

    <p className="control is-expanded has-icons-left has-icons-right">
      <input
        data-cy="searchInput"
        type="text"
        className="input"
        placeholder="Search..."
        value={queryFilterValue}
        onChange={(event) => queryFilterBy(event.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <button
          data-cy="clearSearchButton"
          type="button"
          className="delete"
          onClick={() => queryFilterBy('')}
        />
      </span>
    </p>
  </form>
);
