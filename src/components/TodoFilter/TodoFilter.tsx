import React from 'react';

type Props = {
  query: string,
  changeSortType: (value: string) => void;
  changeQuery: (value: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  changeSortType,
  changeQuery,
}) => {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    changeSortType(event.target.value);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    changeQuery(event.target.value);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleSelectChange}
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
          onChange={handleQueryChange}
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
              onClick={() => changeQuery('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
