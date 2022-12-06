import React from 'react';

type Props = {
  filterBy: string;
  setFilterBy: React.Dispatch<React.SetStateAction<string>>,
  searchBy: string,
  setSearchBy: React.Dispatch<React.SetStateAction<string>>,
};

export const TodoFilter: React.FC<Props> = ({
  filterBy,
  setFilterBy,
  searchBy,
  setSearchBy,
}) => {
  const handleChangeSelect = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => setFilterBy(event.target.value);

  const handleChangeInput = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => setSearchBy(event.target.value);

  const handleClearSearchButton = () => setSearchBy('');

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterBy}
            onChange={handleChangeSelect}
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
          value={searchBy}
          onChange={handleChangeInput}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {searchBy.length > 0 && (
            /* eslint-disable-next-line jsx-a11y/control-has-associated-label */
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClearSearchButton}
            />
          )}
        </span>
      </p>
    </form>
  );
};
