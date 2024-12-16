import React from 'react';

type Props = {
  onQuery: (v: string) => void;
  onFilter: (v: string) => void;
  filter: string;
  query: string;
};

export const TodoFilter: React.FC<Props> = ({
  onQuery,
  query,
  filter,
  onFilter,
}) => {
  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    onQuery(event.target.value);
  };

  const handleChageFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onFilter(event.target.value);
  };

  const reset = () => {
    onQuery('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleChageFilter}
            value={filter}
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
          onChange={handleChangeQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {query && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={reset}
            />
          )}
        </span>
      </p>
    </form>
  );
};
