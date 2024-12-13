import React, { ChangeEvent, useState } from 'react';

import { Filter } from '../../App';

interface Props {
  onFilter: (filters: Filter) => void;
}

export const TodoFilter: React.FC<Props> = ({ onFilter }) => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [titleFilter, setTitleFilter] = useState('');

  const handleChangeStatus = (event: ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(event.target.value);
    onFilter({ status: event.target.value, title: titleFilter });
  };

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setTitleFilter(event.target.value);
    onFilter({
      status: statusFilter,
      title: event.target.value.toLocaleLowerCase().trim(),
    });
  };

  const handleClear = () => {
    setStatusFilter('all');
    setTitleFilter('');
    onFilter({ status: 'all', title: '' });
  };

  const statusOptions = [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
  ];

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={statusFilter}
            onChange={handleChangeStatus}
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.lable}
              </option>
            ))}
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={titleFilter}
          onChange={handleChangeInput}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {titleFilter && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClear}
            />
          </span>
        )}
      </p>
    </form>
  );
};
