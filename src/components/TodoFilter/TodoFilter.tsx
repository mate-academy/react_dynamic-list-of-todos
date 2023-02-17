import React, { ChangeEvent, Dispatch, SetStateAction } from 'react';

type Props = {
  option: string,
  setTypeOfTodos: Dispatch<SetStateAction<string>>,
  filter: string,
  setFilter: Dispatch<SetStateAction<string>>,

};

export const TodoFilter: React.FC<Props> = ({
  option,
  setTypeOfTodos,
  filter,
  setFilter,
}) => {
  const handleTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setTypeOfTodos(event.target.value);
  };

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const handleFilterClear = () => {
    setFilter('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={option}
            onChange={handleTypeChange}
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
          value={filter}
          onChange={handleFilterChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {
          filter && (
            <span className="icon is-right" style={{ pointerEvents: 'all' }}>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={handleFilterClear}
              />
            </span>
          )
        }
      </p>
    </form>
  );
};
