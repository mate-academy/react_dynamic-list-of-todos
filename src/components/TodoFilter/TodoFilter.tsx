import React from 'react';
type Props = {
  inputValue: string;
  setInputValue: (todos: string) => void;
  option: string;
  setOption: (option: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  inputValue,
  setInputValue,
  option,
  setOption,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={option}
            onChange={e => setOption(e.target.value)}
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
          onChange={e => setInputValue(e.target.value)}
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
              onClick={() => setInputValue('')}
              className="delete"
            />
          )}
        </span>
      </p>
    </form>
  );
};
