import React from 'react';
import { FilteringType } from '../../types/FilteringType';

interface Props {
  input: string
  setInput: React.Dispatch<React.SetStateAction<string>>
  selectedButton: string
  setSelectedButton: React.Dispatch<React.SetStateAction<FilteringType>>
}

export const TodoFilter: React.FC<Props> = ({
  input,
  setInput,
  selectedButton,
  setSelectedButton,
}) => {
  function handleInput(e: React.BaseSyntheticEvent) {
    setInput(e.target.value);
  }

  const handleSelect = (value: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedButton(value.target.value as FilteringType);
  };

  const handleDeleteButton = () => {
    setInput('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            value={selectedButton}
            onChange={(value) => handleSelect(value)}
            data-cy="statusSelect"
          >
            <option value={FilteringType.all}>All</option>
            <option value={FilteringType.active}>Active</option>
            <option value={FilteringType.completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          value={input}
          onChange={handleInput}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {input.trim() && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleDeleteButton}
            >
              .
            </button>
          )}
        </span>
      </p>
    </form>
  );
};
