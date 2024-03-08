import React, { useState } from 'react';
import { Select } from '../../types/Select';

interface Props {
  onSelect: (val: Select) => void;
  onInput: (value?: string) => void;
}

export const TodoFilter: React.FC<Props> = ({ onSelect, onInput }) => {
  const [currentSelect, setCurrentSelect] = useState<Select>(Select.All);
  const [input, setInput] = useState('');

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.currentTarget;

    switch (value) {
      case Select.Active.toString():
        setCurrentSelect(Select.Active);
        onSelect(Select.Active);
        break;
      case Select.Completed.toString():
        setCurrentSelect(Select.Completed);
        onSelect(Select.Completed);
        break;
      default:
        setCurrentSelect(Select.All);
        onSelect(Select.All);
    }
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    // eslint-disable-next-line
    const value = event.target.value;

    onInput(value.trim());
    setInput(value);
  };

  const handleClear = () => {
    setInput('');
    onInput();
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            defaultValue={Select.All}
            value={currentSelect}
            onChange={handleSelect}
          >
            <option value={Select.All}>All</option>

            <option value={Select.Active}>Active</option>

            <option value={Select.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          value={input}
          className="input"
          placeholder="Search..."
          onChange={handleInput}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={handleClear}
          />
        </span>
      </p>
    </form>
  );
};
