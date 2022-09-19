import React, { useState } from 'react';

type Props = {
  handleSelect: (value: string) => void,
  handleInpput: (value: string) => void,
};

export const TodoFilter: React.FC<Props> = ({ handleSelect, handleInpput }) => {
  const [inputValue, setInputValue] = useState('');

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(e) => {
              handleSelect(e.currentTarget.value);
            }}
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
            setInputValue(e.currentTarget.value);
            handleInpput(e.currentTarget.value);
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {inputValue !== ''
            && (
              // eslint-disable-next-line jsx-a11y/control-has-associated-label
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={() => {
                  setInputValue('');
                  handleInpput('');
                }}
              />
            )}

        </span>
      </p>
    </form>
  );
};
