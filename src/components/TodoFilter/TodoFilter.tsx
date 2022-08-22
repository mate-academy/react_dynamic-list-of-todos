import React from 'react';
import { Filter } from '../../types/Filter';

type Props = {
  onChange: (query: string) => void;
  query: string;
  selectFilter: (filter: Filter) => void;
  filterType: Filter;
};

export const TodoFilter: React.FC<Props> = (props) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={props.filterType}
          onChange={(event) => props.selectFilter(event.target.value as Filter)}
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
        value={props.query}
        onChange={(event) => props.onChange(event.target.value)}
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
          onClick={() => props.onChange('')}
        />
      </span>
    </p>
  </form>
);
