import React, { ChangeEvent, useState } from 'react';
import { Filter } from '../../types/Filter';

interface Props {
  filterBy: (filters: Filter) => void,
}

export const TodoFilter: React.FC<Props> = ({ filterBy }) => {
  const [status, setStatus] = useState('all');
  const [title, setTitle] = useState('');

  const handleStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value);
    filterBy({ status: event.target.value, title });
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    filterBy({ status, title: event.target.value });
  };

  const onClear = () => {
    setStatus('all');
    setTitle('');
    filterBy({ status: 'all', title: '' });
  };

  return (
    <>
      <form className="field has-addons">
        <p className="control">
          <span className="select">
            <select
              data-cy="statusSelect"
              value={status}
              onChange={handleStatusChange}
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
            value={title}
            onChange={handleInputChange}
          />
          <span className="icon is-left">
            <i className="fas fa-magnifying-glass" />
          </span>

          {!!title && (
            <span className="icon is-right" style={{ pointerEvents: 'all' }}>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={onClear}
              />
            </span>
          )}
        </p>
      </form>
    </>
  );
};
