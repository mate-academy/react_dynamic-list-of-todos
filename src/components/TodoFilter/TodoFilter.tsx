import React from 'react';

interface Props {
  currentStatus: string;
  inputValue: string;
  handleChangeStatus: (currentStatus: string) => void;
  changeInput: (inputValue: string) => void;
}

export const TodoFilter: React.FC<Props> = ({
  inputValue,
  currentStatus,
  handleChangeStatus,
  changeInput,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={currentStatus}
          onChange={event => handleChangeStatus(event.target.value)}
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
        onChange={event => changeInput(event.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {inputValue && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => changeInput('')}
          />
        </span>
      )}
    </p>
  </form>
);
