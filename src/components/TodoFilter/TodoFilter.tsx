import React from 'react';
import { Status } from '../../types/Status';

type Props = {
  inputValue: string;
  handleSelectedStatus: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  resetStatus: () => void;
};

export const TodoFilter: React.FC<Props> = ({
  handleQueryChange,
  handleSelectedStatus,
  inputValue,
  resetStatus,
}: Props) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleSelectedStatus}>
            <option value="all">{Status.ALL}</option>
            <option value="active">{Status.ACTIVE}</option>
            <option value="completed">{Status.COMPLETED}</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          value={inputValue}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          onChange={handleQueryChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {inputValue && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={resetStatus}
            />
          )}
        </span>
      </p>
    </form>
  );
};
