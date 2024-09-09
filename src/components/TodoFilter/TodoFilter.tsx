import React, { ChangeEvent, useState } from 'react';
import { FilterTypes } from '../enums/FilterTypes';
import classNames from 'classnames';

interface Props {
  handleFilterChange: (filterOption: FilterTypes) => void;
  handleInputChange: (input: string) => void;
}

export const TodoFilter: React.FC<Props> = ({
  handleFilterChange,
  handleInputChange,
}) => {
  const { All, Active, Completed } = FilterTypes;

  const [inputValue, setInputValue] = useState('');

  const handleOnChangeStatus = (event: ChangeEvent<HTMLSelectElement>) => {
    handleFilterChange(event.target.value as FilterTypes);
  };

  const handleOnInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    handleInputChange(event.target.value);
  };

  const resetInput = () => {
    setInputValue('');
    handleInputChange('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleOnChangeStatus}>
            <option value={All}>All</option>
            <option value={Active}>Active</option>
            <option value={Completed}>Completed</option>
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
          onChange={handleOnInputChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span
          className={classNames('icon', 'is-right', {
            'pointer-events-all': inputValue,
          })}
        >
          {inputValue && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => resetInput()}
            />
          )}
        </span>
      </p>
    </form>
  );
};
