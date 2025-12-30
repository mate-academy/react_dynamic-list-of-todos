import { FilterTodo } from '../../types/FilterTodo';
import React from 'react';

type Props = {
  inputValue: string;
  selectValue: FilterTodo;
  changeInputValue: (value: string) => void;
  changeFilterValue: (value: FilterTodo) => void;
};

export const TodoFilter: React.FC<Props> = ({
  inputValue,
  selectValue,
  changeInputValue,
  changeFilterValue,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    changeInputValue(event.target.value);
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    changeFilterValue(event.target.value as FilterTodo);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectValue}
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
          onChange={handleChange}
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
              onClick={() => changeInputValue('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
