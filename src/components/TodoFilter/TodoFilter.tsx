import React from 'react';
import { Status } from '../TodoFilter/index';

type Props = {
  onChange: (status: Status) => void;
  onTitleFilterChange: (title: string) => void;
  setFilterTitle: (title: string) => void;
  setFilterStatus: (status: Status) => void;
  filterTitle: string;
  filterStatus: Status;
};

export const TodoFilter: React.FC<Props> = ({
  onChange,
  onTitleFilterChange,
  setFilterStatus,
  setFilterTitle,
  filterTitle,
  filterStatus,
}) => {
  const handleDelete = () => {
    setFilterTitle('');
    setFilterStatus('all');
    onChange('all');
  };

  const isInputIsEmpty = filterTitle === '';
  const areFiltersInWork = filterTitle !== '' || filterStatus !== 'all';

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={event => onChange(event.target.value as Status)}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          onChange={event => {
            setFilterTitle(event.target.value);
            onTitleFilterChange(event.target.value);
          }}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={filterTitle}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>
        {(!isInputIsEmpty || areFiltersInWork) && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              onClick={handleDelete}
              data-cy="clearSearchButton"
              type="button"
              className="delete"
            />
          </span>
        )}
      </p>
    </form>
  );
};
