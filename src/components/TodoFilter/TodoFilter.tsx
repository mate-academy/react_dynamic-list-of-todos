import React from 'react';

type Props = {
  selectOption: string;
  selectSearch: string;
  onFilterChange: (value: string) => void;
  onSearchChange: (value: string) => void;
};
export const TodoFilter: React.FC<Props> = ({
  selectOption,
  selectSearch,
  onFilterChange,
  onSearchChange,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={selectOption}
          onChange={e => onFilterChange(e.target.value)}
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
        value={selectSearch}
        onChange={e => onSearchChange(e.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {selectSearch && (
        <span
          className="icon is-right"
          style={{ pointerEvents: 'all' }}
          onClick={() => onSearchChange('')}
        >
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
          />
        </span>
      )}
    </p>
  </form>
);
