import React from 'react';

type Props = {
  query: string;
  setQuery: (val: string) => void;
  filterType: string;
  setFilterType: (val: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  setQuery,
  filterType,
  setFilterType,
}) => {
  const handleFilterType = (event: React.ChangeEvent<HTMLSelectElement>) => (
    setFilterType(event.target.value)
  );

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => (
    setQuery(event.target.value)
  );

  const handleQuery = () => (setQuery(''));

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterType}
            onChange={handleFilterType}
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
          onChange={handleInput}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query && (
          /* eslint-disable-next-line jsx-a11y/control-has-associated-label */
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleQuery}
            />
          )}
        </span>
      </p>
    </form>
  );
};
