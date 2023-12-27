import React from 'react';

export enum Filters {
  all = 'all',
  active = 'active',
  completed = 'completed',
}

interface Props {
  selectedValue: Filters;
  selectFilter: (filter: Filters) => void;
  inputValue: string;
  onInputChange: (newQuery: string) => void;
}

export const TodoFilter: React.FC<Props> = ({
  selectedValue,
  selectFilter,
  inputValue,
  onInputChange,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={selectedValue}
          onChange={(event) => selectFilter(event.target.value as Filters)}
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
        value={inputValue}
        onChange={(event) => onInputChange(event.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {inputValue && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => onInputChange('')}
          />
        </span>
      )}
    </p>
  </form>
);
