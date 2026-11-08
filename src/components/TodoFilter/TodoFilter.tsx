import React from 'react';
import { FilterStatus } from '../../types/FilterStatus';

type Props = {
  setFilterTodo: (filter: FilterStatus) => void;
  inputQuery: string;
  onChangeQuery: (value: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  setFilterTodo,
  inputQuery,
  onChangeQuery,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          onChange={event => setFilterTodo(event.target.value as FilterStatus)}
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
        value={inputQuery}
        onChange={event => onChangeQuery(event.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        {inputQuery && (
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => onChangeQuery('')}
          />
        )}
      </span>
    </p>
  </form>
);
