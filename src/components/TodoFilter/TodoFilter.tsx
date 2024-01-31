import React, { ChangeEvent } from 'react';

type Props = {
  todoFilter: string,
  setTodoFilter: React.Dispatch<React.SetStateAction<string>>
  todoSearch: string,
  setTodoSearch: React.Dispatch<React.SetStateAction<string>>
};

export const TodoFilter:React.FC<Props> = ({
  todoFilter, setTodoFilter, todoSearch, setTodoSearch,
}) => {
  const handleFilter = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;

    setTodoFilter(selectedValue);
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setTodoSearch(event.target.value.toLowerCase());
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={todoFilter}
            onChange={handleFilter}
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
          value={todoSearch}
          onChange={handleSearch}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {todoSearch
          && (
            // eslint-disable-next-line jsx-a11y/control-has-associated-label
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setTodoSearch('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
