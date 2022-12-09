import React, { useState } from 'react';

interface Props {
  onSelect: (option: string) => void,
  onSearch: (str: string) => void,
}

export const TodoFilter: React.FC<Props> = ({ onSelect, onSearch }) => {
  const [selectedOption, setSelectedOption] = useState('all');
  const [inputValue, setInputValue] = useState('');

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelect(event.target.value);
    setSelectedOption(event.target.value);
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
    setInputValue(event.target.value);
  };

  const handleClear = () => {
    setInputValue('');
    onSearch('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectedOption}
            onChange={handleSelect}
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
              onClick={handleClear}
            />
          </span>
        )}
      </p>
    </form>
  );
};
