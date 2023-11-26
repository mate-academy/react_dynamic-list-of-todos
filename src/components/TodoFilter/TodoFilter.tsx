import React, { useContext, useState, useEffect } from 'react';
import { TodosContext, Status } from '../../TodosProvider';
import { getTodos } from '../../api';

export const TodoFilter: React.FC = () => {
  const {
    prepareTodos,
    setFilteredToods,
    searchValue,
    setSearchValue,
  } = useContext(TodosContext);
  const [selectedOption, setSelectedOption] = useState(Status.all);
  const handleOptionChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedOption(event.target.value as Status);
  };

  useEffect(() => {
    getTodos()
      .then((todosFromServer) => {
        setFilteredToods(prepareTodos(
          todosFromServer,
          selectedOption,
          searchValue,
        ));
      });
  }, [selectedOption, prepareTodos, searchValue, setFilteredToods]);

  const handleSearchValueChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchValue(event.target.value);
  };

  const clearSearch = () => {
    setSearchValue('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleOptionChange}
          >
            <option
              value="all"
            >
              All
            </option>
            <option
              value="active"
            >
              Active
            </option>
            <option
              value="completed"
            >
              Completed
            </option>
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
          onChange={handleSearchValueChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {searchValue && (
            <>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={clearSearch}
              />
            </>
          )}
        </span>
      </p>
    </form>
  );
};
