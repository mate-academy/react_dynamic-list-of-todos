import React from 'react';

enum SortType {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

type Props = {
  changeFilteredType: (filterType: string) => void,
  changeQuery: (input: string) => void,
  query: string,
};

export const TodoFilter: React.FC<Props> = ({
  changeFilteredType,
  changeQuery,
  query,
}) => {
  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    changeQuery(event.target.value);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    changeFilteredType(event.target.value);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(event) => handleStatusChange(event)}
          >
            <option value={SortType.ALL}>All</option>
            <option value={SortType.ACTIVE}>Active</option>
            <option value={SortType.COMPLETED}>Completed</option>
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
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => changeQuery('')}
          />
        </span>
      </p>
    </form>
  );
};
