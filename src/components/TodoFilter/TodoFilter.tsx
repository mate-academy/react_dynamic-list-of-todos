import React from 'react';
import { Status } from '../../App';

interface Props {
  currentStatus: Status;
  inputValue: string;
  handleChangeStatus: (currentStatus: Status) => void;
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
          onChange={event => handleChangeStatus(event.target.value as Status)}
        >
          <option value={Status.all}>All</option>
          <option value={Status.active}>Active</option>
          <option value={Status.completed}>Completed</option>
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
