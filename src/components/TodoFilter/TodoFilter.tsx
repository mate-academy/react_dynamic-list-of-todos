import React, { useContext } from 'react';
import { TodosContext } from '../TodosContext/TodosContext';

export const TodoFilter: React.FC = () => {
  const {
    selectValue,
    handleSelectValue,
    handleChangeSearch,
    searchValue,
    clearSearchValue,
  } = useContext(TodosContext);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    handleSelectValue(event?.target.value.toLowerCase());
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectValue}
            onChange={handleSelectChange}
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
          value={searchValue}
          onChange={handleChangeSearch}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {searchValue && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={clearSearchValue}
            />
          </span>
        )}
      </p>
    </form>
  );
};
