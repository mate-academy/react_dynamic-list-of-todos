import React from 'react';
import { AllOptions } from '../../types/AllOptions';

interface Props {
  value: string;
  onValueChange: (val: string) => void;
  selectOption: string;
  onSelectChange: (val: AllOptions) => void;
}

export const TodoFilter: React.FC<Props> = ({
  value,
  onValueChange,
  selectOption,
  onSelectChange,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectOption}
            onChange={e => onSelectChange(e.target.value as AllOptions)}
          >
            <option value={AllOptions.All}>All</option>
            <option value={AllOptions.Active}>Active</option>
            <option value={AllOptions.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={value}
          onChange={e => onValueChange(e.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {value && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => onValueChange('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
