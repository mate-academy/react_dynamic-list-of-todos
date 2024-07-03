import React, { useState } from 'react';

type Props = {
  setFilter: (filter: string) => void;
  setSearchInput: (searchInput: string) => void;
};

export const TodoFilter: React.FC<Props> = ({ setFilter, setSearchInput }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setInputValue(value);
    setSearchInput(value);
  };

  const resetFilter = () => {
    setInputValue('');
    setFilter('all');
    setSearchInput('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleSelect}>
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
          onChange={handleInput}
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
              onClick={resetFilter}
            />
          </span>
        )}
      </p>
    </form>
  );
};
