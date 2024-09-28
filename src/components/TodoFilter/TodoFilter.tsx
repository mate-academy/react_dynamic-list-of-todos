import React from 'react';
import { Filter } from '../../types/EnumFilter';

type Props = {
  filterBy: (event: string) => void;
  onQuery: (event: string) => void;
  query: string;
};

export const TodoFilter: React.FC<Props> = ({ filterBy, onQuery, query }) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          onChange={event => filterBy(event.target.value)}
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
        onChange={event => onQuery(event.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        {query && (
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => onQuery('')}
          />
        )}
      </span>
    </p>
  </form>
);
