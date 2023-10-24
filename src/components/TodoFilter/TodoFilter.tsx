import React from 'react';
import { TodoStatus } from '../../utils/FilterParams';

type Props = {
  filter: TodoStatus,
  onFilterChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
  inputValue: string,
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  clearInput: () => void;
};

export const TodoFilter: React.FC<Props> = ({
  filter,
  onFilterChange,
  inputValue,
  onInputChange,
  clearInput,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter}
            onChange={onFilterChange}
          >
            {Object.values(TodoStatus).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          value={inputValue}
          onChange={onInputChange}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {inputValue && (
            <button
              aria-label="button delete"
              onClick={clearInput}
              data-cy="clearSearchButton"
              type="button"
              className="delete"
            />
          )}
        </span>
      </p>
    </form>
  );
};
