/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';

type Props = {
  selectValue: string;
  filterValue: string;
  hundleSelect: (value: string) => void;
  hundleChange: (value: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  selectValue,
  filterValue,
  hundleSelect,
  hundleChange,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={selectValue}
          onChange={(event) => hundleSelect(event.target.value)}
        >
          <option value="">All</option>
          <option value="false">Active</option>
          <option value="true">Completed</option>
        </select>
      </span>
    </p>

    <p className="control is-expanded has-icons-left has-icons-right">
      <input
        data-cy="searchInput"
        type="text"
        className="input"
        placeholder="Search..."
        value={filterValue}
        onChange={(event) => hundleChange(event.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {filterValue && (
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => hundleChange('')}
          />
        )}
      </span>
    </p>
  </form>
);
