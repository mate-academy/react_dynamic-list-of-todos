import React from 'react';

import { TodoFilterValues } from '../../types/filterEnum';

type Props = {
  todoFilter: TodoFilterValues;
  selectTodoFilter: (value: string) => void;
  query: string;
  setQuery: (value: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  todoFilter,
  selectTodoFilter,
  query,
  setQuery,
}) => (
  <form
    className="field has-addons"
    onSubmit={(e) => {
      e.preventDefault();
    }}
  >
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={todoFilter}
          onChange={(event) => {
            const sortBy = event.target.value;

            selectTodoFilter(sortBy);
          }}
        >
          <option value={TodoFilterValues.all}>All</option>
          <option value={TodoFilterValues.active}>Active</option>
          <option value={TodoFilterValues.completed}>Completed</option>
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
        onChange={(event) => {
          setQuery(event.target.value.toLowerCase());
        }}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {query !== '' && (
          // eslint-disable-next-line jsx-a11y/control-has-associated-label
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={(event) => {
              event.preventDefault();
              setQuery('');
            }}
          />
        )}
      </span>
    </p>
  </form>
);
