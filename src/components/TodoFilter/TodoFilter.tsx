import React from 'react';
import { StatusFilterOptions as SFO } from '../../types/StatusFilterOptions';

type Props = {
  searchInputValue: string;
  onChangeTitleFilter: React.Dispatch<React.SetStateAction<string>>;
  onChangeStatusFilter: React.Dispatch<React.SetStateAction<SFO>>;
};

export const TodoFilter: React.FC<Props> = ({
  searchInputValue,
  onChangeTitleFilter,
  onChangeStatusFilter,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeTitleFilter(e.target.value);
  };

  const handleStatusSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const value = e.target.value as SFO;

    onChangeStatusFilter(value);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleStatusSelectChange}>
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
          value={searchInputValue}
          onChange={handleInputChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {searchInputValue && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => onChangeTitleFilter('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
