import { useState } from 'react';
import { TaskStatus } from '../../types/TaskStatus';

interface TodoFilterProps {
  setTaskStatusFilter: (value: TaskStatus)=>void
  setQueryFilter: (arg0: string)=>void
}

export const TodoFilter = ({
  setTaskStatusFilter,
  setQueryFilter,
}: TodoFilterProps) => {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<TaskStatus>('all');

  const handleInputChange = (value: string) => {
    setQuery(value);
    setQueryFilter(value);
  };

  const handleStatusChange = (value: string) => {
    setStatus(value as TaskStatus);
    setTaskStatusFilter(value as TaskStatus);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(event) => handleStatusChange(event
              .target.value as TaskStatus)}
            value={status}
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
          onChange={(event) => handleInputChange(event.target.value)}
          value={query}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {query && (
            // eslint-disable-next-line jsx-a11y/control-has-associated-label
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => handleInputChange('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
