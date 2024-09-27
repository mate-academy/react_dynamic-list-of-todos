import React, { useState } from 'react';

interface Props {
  onSelect: (value: string) => void;
  onChange: (value: string) => void;
}

export const TodoFilter: React.FC<Props> = ({ onSelect, onChange }) => {
  const [value, setValue] = useState('');
  const inputHandler: React.ChangeEventHandler<HTMLInputElement> = event => {
    onChange(event.target.value);
    setValue(event.target.value);
  };

  const resetInputHandler = () => {
    onChange('');
    setValue('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={event => onSelect(event.target.value)}
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
          value={value}
          onChange={inputHandler}
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
              onClick={resetInputHandler}
            />
          </span>
        )}
      </p>
    </form>
  );
};
