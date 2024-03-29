import React from 'react';
import { Status } from '../../enums/Status';
type Props = {
  handleFilter: (e: React.ChangeEvent<HTMLInputElement>) => void;
  text: string;
  handleClearInput: () => void;
  handleCheckStatus: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};
export const TodoFilter: React.FC<Props> = ({
  handleFilter,
  text,
  handleClearInput,
  handleCheckStatus,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            defaultValue={Status.All}
            data-cy="statusSelect"
            onChange={handleCheckStatus}
          >
            <option value={Status.All.toLowerCase()}>{Status.All}</option>
            <option value={Status.Active.toLowerCase()}>{Status.Active}</option>
            <option value={Status.Completed.toLowerCase()}>
              {Status.Completed}
            </option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          value={text}
          className="input"
          placeholder="Search..."
          onChange={handleFilter}
        />

        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>
        {text && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              onClick={handleClearInput}
              data-cy="clearSearchButton"
              type="button"
              className="delete"
            />
          </span>
        )}
      </p>
    </form>
  );
};
