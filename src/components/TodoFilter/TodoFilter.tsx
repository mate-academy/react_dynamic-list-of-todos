import React from 'react';

interface Props {
  status: string;
  inputValue: string;
  setStatus: (value: string) => void;
  setInputValue: (value: string) => void;
}

export const TodoFilter: React.FC<Props> = ({
  status,
  inputValue,
  setStatus,
  setInputValue,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={event => setStatus(event.target.value)}
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
          value={inputValue}
          onChange={event => setInputValue(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {inputValue.length > 0 && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              aria-label="сlear search"
              onClick={() => setInputValue('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
