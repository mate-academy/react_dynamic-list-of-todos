import React, { ChangeEventHandler } from 'react';

type Props = {
  option: string,
  onSelectChange: ChangeEventHandler<HTMLSelectElement>,
  filter: string,
  onFilterChange: ChangeEventHandler<HTMLInputElement>,
  onFilterClear: () => void;
};

export const TodoFilter: React.FC<Props> = ({
  option,
  onSelectChange,
  filter,
  onFilterChange,
  onFilterClear,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select data-cy="statusSelect" value={option} onChange={onSelectChange}>
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
        value={filter}
        onChange={onFilterChange}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {
        filter && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={onFilterClear}
            />
          </span>
        )
      }
    </p>
  </form>
);
