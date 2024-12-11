import React, { useState } from 'react';

type Props = {
  filtering: (mode: string) => void;
  finding: (inputText: string) => void;
};

export const TodoFilter: React.FC<Props> = ({ filtering, finding }) => {
  const [inputValue, setInputValue] = useState('');

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={event => filtering(event.target.value)}
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
          onChange={event => {
            const newValue = event.target.value;

            setInputValue(newValue);
            finding(newValue);
          }}
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
              onClick={() => {
                setInputValue('');
                filtering('all');
                finding('');
              }}
            />
          )}
        </span>
      </p>
    </form>
  );
};
