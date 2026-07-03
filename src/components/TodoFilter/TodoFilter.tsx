import React from 'react';
import classNames from 'classnames';

interface Props {
  filterTitle: string;
  onFilterTitleChange: (value: string) => void;
  filterStatus: string;
  onFilterStatusChange: (value: string) => void;
}

export const TodoFilter: React.FC<Props> = ({
  filterTitle,
  onFilterTitleChange,
  filterStatus,
  onFilterStatusChange,
}) => {
  return (
    <div className="field is-grouped is-grouped-multiline">
      <div className="control is-expanded">
        <div className="input-container">
          <input
            type="text"
            data-cy="searchInput"
            className="input"
            placeholder="Search todo..."
            value={filterTitle}
            onChange={e => onFilterTitleChange(e.target.value)}
          />
          {filterTitle && (
            <button
              type="button"
              data-cy="clearSearchButton"
              className="clear-button"
              onClick={() => onFilterTitleChange('')}
            >
              x
            </button>
          )}
        </div>
      </div>

      <div className="control">
        <div className="select">
          <select
            data-cy="statusSelect"
            value={filterStatus}
            onChange={e => onFilterStatusChange(e.target.value)}
            className={classNames({ 'is-danger': false })}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>
    </div>
  );
};
