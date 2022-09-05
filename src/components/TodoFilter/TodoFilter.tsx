import React from 'react';
import { TodoFilterBy } from '../../types/TodoFilterBy';

type Props = {
  setFilter: (newFilter: TodoFilterBy) => void,
  setQuery: (query: string) => void,
  filter: string,
  query: string,
};

export const TodoFilter: React.FC<Props> = (props) => {
  const {
    query, setQuery, filter, setFilter,
  } = props;

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter}
            onChange={
              ({ target }) => setFilter(target.value as TodoFilterBy)
            }
          >
            <option value={TodoFilterBy.NONE}>All</option>
            <option value={TodoFilterBy.ACTIVE}>Active</option>
            <option value={TodoFilterBy.COMPLETED}>Completed</option>
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
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setQuery('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
