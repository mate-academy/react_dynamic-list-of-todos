import React from 'react';

type Props = {
  filterByActive: () => void;
  filterByCompleted: () => void;
  resetFilters: () => void;
  query: string;
  setQuery: (event: React.ChangeEvent<HTMLInputElement>) => void;
  closeByQuery: () => void;
};

export const TodoFilter: React.FC<Props> = ({
  filterByActive,
  filterByCompleted,
  resetFilters,
  query,
  setQuery,
  closeByQuery,
}) => {
  const handlerFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    switch (e.target.value) {
      case 'active':
        filterByActive();
        break;
      case 'completed':
        filterByCompleted();
        break;
      default:
        resetFilters();
    }
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handlerFilterChange}>
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
          onChange={setQuery}
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
            onClick={closeByQuery}
          />
        </span>
      </p>
    </form>
  );
};
