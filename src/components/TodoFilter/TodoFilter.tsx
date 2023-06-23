import React from 'react';
import { TodoStatus } from '../../types/TodoStatus';
import { capitalize } from '../../helpers/capitalize';

interface Props {
  query: string;
  status: string;
  onFilter: (value: string) => void;
  onSelectStatus: (todoStatus: TodoStatus) => void;
}

export const TodoFilter: React.FC<Props> = ({
  query,
  status,
  onFilter,
  onSelectStatus,
}) => {
  const handleFormOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleQueryOnChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    onFilter(event.target.value);
  };

  const handleStatusSelectOnChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    onSelectStatus(event.target.value as TodoStatus);
  };

  const handleClearButtonOnClick = () => onFilter('');

  return (
    <form
      className="field has-addons"
      onSubmit={handleFormOnSubmit}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={handleStatusSelectOnChange}
          >
            {Object.values(TodoStatus).map((todoStatus) => (
              <option key={todoStatus} value={todoStatus}>
                {capitalize(todoStatus)}
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
          value={query}
          onChange={handleQueryOnChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              aria-label="clear"
              onClick={handleClearButtonOnClick}
            />
          )}
        </span>
      </p>
    </form>
  );
};
