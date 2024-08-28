import React, { ChangeEvent } from 'react';
import { FilterTypes } from '../enums/FilterTypes';

interface Props {
  handleFilterChange: (filterOption: FilterTypes) => void;
  handleInputChange: (input: string) => void;
}

export const TodoFilter: React.FC<Props> = ({
  handleFilterChange,
  handleInputChange,
}) => {
  const { All, Active, Completed } = FilterTypes;

  const handleOnChangeStatus = (event: ChangeEvent<HTMLSelectElement>) => {
    handleFilterChange(event.target.value as FilterTypes);
  };

  const handleOnInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleInputChange(event.target.value);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleOnChangeStatus}>
            <option value={All}>{All}</option>
            <option value={Active}>{Active}</option>
            <option value={Completed}>{Completed}</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          onChange={handleOnInputChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => handleInputChange('')}
          />
        </span>
      </p>
    </form>
  );
};
