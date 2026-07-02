import React from 'react';

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
    <div className="field is-grouped">
      <div className="control is-expanded has-icons-right">
        <input
          type="text"
          className="input"
          placeholder="Filter by title"
          data-cy="searchInput"
          value={filterTitle}
          onChange={e => onFilterTitleChange(e.target.value)}
        />

        {filterTitle && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              type="button"
              className="delete"
              data-cy="clearSearchButton"
              aria-label="clear filter"
              onClick={() => onFilterTitleChange('')}
            />
          </span>
        )}
      </div>

      <div className="control">
        <div className="select">
          <select
            data-cy="statusSelect"
            value={filterStatus}
            onChange={e => onFilterStatusChange(e.target.value)}
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
