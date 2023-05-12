import React from 'react';
import { FilterBy } from '../../types/typedefs';

interface Props {
  query: string;
  todos: string;
  onChange: (query: string) => void;
  onSelect: (filterTodos: FilterBy) => void;
}

export const TodoFilter: React.FC<Props> = ({
  query,
  todos: filterTodos,
  onChange: onQuery,
  onSelect: onfilterTodos,
}) => {
  const arrayFilterBy = [FilterBy.ALL, FilterBy.ACTIVE, FilterBy.COMPLETED];

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterTodos}
            onChange={(event) => onfilterTodos(event.target.value as FilterBy)}
          >
            {arrayFilterBy.map(item => (
              <option key={item} value={item}>{item}</option>
            ))}
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
          onChange={(event) => onQuery(event.target.value)}
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
              onClick={() => onQuery('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
