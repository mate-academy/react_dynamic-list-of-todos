import React from 'react';
import { TodosState } from '../../types/TodosState';
import { Filter } from '../../types/enum/Filter';

interface Props {
  setTodosState: React.Dispatch<React.SetStateAction<TodosState>>
  todosState: TodosState
}

export const TodoFilter: React.FC<Props> = ({ setTodosState, todosState }) => {
  const { filter, query } = todosState;

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    setTodosState((currentTodosState) => ({
      ...currentTodosState,
      filter: value as Filter,
    }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setTodosState((currentTodosState) => ({
      ...currentTodosState,
      query: value,
    }));
  };

  const handleCleanSearch = () => {
    setTodosState((currentTodosState) => ({
      ...currentTodosState,
      query: '',
    }));
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter}
            onChange={handleSelectChange}
          >
            <option value={Filter.All}>All</option>
            <option value={Filter.Active}>Active</option>
            <option value={Filter.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={query}
          onChange={handleSearchChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {
          query && (
            <span className="icon is-right" style={{ pointerEvents: 'all' }}>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={handleCleanSearch}
              />
            </span>
          )
        }
      </p>
    </form>
  );
};
