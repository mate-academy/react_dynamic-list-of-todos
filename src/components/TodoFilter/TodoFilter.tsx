import React from 'react';
import { TodoStatus } from '../../types/TodoStatus';

type Props = {
  todoStatus: TodoStatus;
  selectStatus: (
    status: TodoStatus
  ) => void;
  query: string;
  setQuery: (searchText: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  todoStatus,
  selectStatus,
  query,
  setQuery,
}) => {
  const handleStatusSelection = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    switch (event.target.value) {
      case TodoStatus.Completed:
        selectStatus(TodoStatus.Completed);
        break;

      case TodoStatus.Active:
        selectStatus(TodoStatus.Active);
        break;

      default:
        selectStatus(TodoStatus.All);
        break;
    }
  };

  const handleSearch = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setQuery(event.target.value);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={todoStatus}
            onChange={handleStatusSelection}
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
          value={query}
          onChange={handleSearch}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query && (
            /* eslint-disable-next-line jsx-a11y/control-has-associated-label */
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setQuery('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
