import React from 'react';

type Props = {
  setSelectedOption: (str: string) => void;
  setInputValue: (str: string) => void;
  inputValue: string;
};

export const TodoFilter: React.FC<Props> = ({
  inputValue,
  setSelectedOption,
  setInputValue,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(e) => setSelectedOption(e.target.value)}
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
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {inputValue.length && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={(() => {
                setInputValue('');
              })}
            >
              {}
            </button>
          )}
        </span>
      </p>
    </form>
  );
};
