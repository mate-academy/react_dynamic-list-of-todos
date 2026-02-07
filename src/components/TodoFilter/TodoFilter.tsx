import React, { useContext } from 'react';
import { TodoContext } from '../../context/todocontext';
import { FILTERS } from '../../filter/filter';

export const TodoFilter: React.FC = () => {
  const context = useContext(TodoContext);

  const {
    handleActive,
    handleCompleted,
    handleFilterAll,
    filtrar,
    query,
    onQuery,
  } = context;

  const { all, completed, active } = FILTERS;

  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    onQuery(event.target.value);
  };

  const handleReset = () => {
    onQuery('');
  };


  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filtrar}
            onChange={event => {
              const value = event.target.value;

              if (value === all) {
                return handleFilterAll();
              } else if (value === active) {
                return handleActive();
              } else if (value === completed) {
                return handleCompleted();
              }
            }}
          >
            <option value={all}>All</option>
            <option value={active}>Active</option>
            <option value={completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          value={query}
          className="input"
          onChange={handleQuery}
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query.length !== 0 && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              onClick={handleReset}
              className="delete"
            />
          </span>
        )}
      </p>
    </form>
  );
};
