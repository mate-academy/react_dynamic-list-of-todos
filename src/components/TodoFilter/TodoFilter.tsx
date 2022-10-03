import React from 'react';

type Props = {
  setQuery: (value: string) => void,
  query: string,
  filterTodoBy: string,
  setFilterTodoBy: (value: string) => void,
};

export const TodoFilter: React.FC<Props> = ({
  setQuery,
  setFilterTodoBy,
  query,
  filterTodoBy,
}) => {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterTodoBy(event.target.value);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            name="typeSort"
            value={filterTodoBy}
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
          value={query}
          onChange={handleSearch}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query.length > 0
            && (
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                aria-label="reset"
                onClick={() => (setQuery(''))}
              />
            )}

        </span>
      </p>
    </form>
  );
};
