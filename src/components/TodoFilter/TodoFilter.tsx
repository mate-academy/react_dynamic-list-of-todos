import React from 'react';

interface TodoFilterProps {
  filterType: string;
  onFilterTypeChange: (option: string) => void;
  inputValue: string;
  onInputValueChange: (input: string) => void;
}

export const TodoFilter: React.FC<TodoFilterProps> = React.memo((
  {
    filterType, onFilterTypeChange, inputValue, onInputValueChange,
  },
) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={filterType}
          onChange={(event) => onFilterTypeChange(event.target.value)}
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
        onChange={(event) => onInputValueChange(event.target.value)}
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
            onClick={() => onInputValueChange('')}
          />
        </span>
      )}
    </p>
  </form>
));
