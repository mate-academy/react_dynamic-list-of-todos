import React from 'react';
import { useTodoDispatch, useTodoState } from '../TodoProvider';

export const TodoFilter: React.FC = () => {
  const { filter, query } = useTodoState();
  const dispatch = useTodoDispatch();

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: 'SET_FILTER',
      payload: event.target.value,
    });
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'SET_QUERY',
      payload: event.target.value,
    });
  };

  const handleSetQueryClear = () => {
    dispatch({
      type: 'SET_QUERY',
      payload: '',
    });
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter}
            onChange={handleFilterChange}
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
          value={query}
          onChange={handleQueryChange}
        />

        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={handleSetQueryClear}
          />
        </span>
      </p>
    </form>
  );
};
