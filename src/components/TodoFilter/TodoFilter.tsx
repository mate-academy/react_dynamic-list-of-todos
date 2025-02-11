import React from 'react';

type Props = {
  selectValue: string;
  inputValue: string;
  onSelectValue: (v: string) => void;
  onInputValue: (v: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  selectValue,
  inputValue,
  onSelectValue,
  onInputValue,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          value={selectValue}
          data-cy="statusSelect"
          onChange={event => onSelectValue(event.currentTarget.value)}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
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
        onChange={event => onInputValue(event.currentTarget.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        {inputValue && (
          <button
            data-cy="clearSearchButton"
            aria-label="Clear input button"
            type="button"
            className="delete"
            onClick={() => onInputValue('')}
          />
        )}
      </span>
    </p>
  </form>
);
