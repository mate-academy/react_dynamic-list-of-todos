import React from 'react';
import { TypeTodos } from '../../types/type';

type Props = {
  setTypeSelect: (select: TypeTodos) => void
  query: string
  setQuery: (query: string) => void
};

export const TodoFilter: React.FC<Props> = ({
  setTypeSelect,
  query,
  setQuery,
}) => {
  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTypeSelect(event.target.value as TypeTodos);
  };

  const handleFindByQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select" onChange={handleFilterChange}>
          <select data-cy="statusSelect">
            <option value={TypeTodos.ALL}>All</option>
            <option value={TypeTodos.ACTIVE}>Active</option>
            <option value={TypeTodos.COMPLETED}>Completed</option>
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
          onChange={handleFindByQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>
        {query.length > 0 && (
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
