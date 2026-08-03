import type { ChangeEvent, FormEvent } from 'react';
import type { TodoStatus } from '../../types/TodoStatus';

type Props = {
  query: string;
  status: TodoStatus;
  onQueryChange: (query: string) => void;
  onStatusChange: (status: TodoStatus) => void;
  onQueryClear: () => void;
};

export const TodoFilter = ({
  query,
  status,
  onQueryChange,
  onStatusChange,
  onQueryClear,
}: Props) => {
  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };

  const handleStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onStatusChange(event.target.value as TodoStatus);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form className="field has-addons" onSubmit={handleSubmit}>
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
          value={query}
          onChange={handleQueryChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query !== '' && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={onQueryClear}
            />
          </span>
        )}
      </p>
    </form>
  );
};
