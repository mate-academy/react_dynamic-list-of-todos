import React from 'react';

type Props = {
  filteredBy: string;
  selectHandler: (event: React.FormEvent<HTMLSelectElement>) => void;
  searchValue: string;
  inputHandler: (event: React.FormEvent<HTMLInputElement>) => void;
  isDeleteButtonAvailable: boolean;
  clearInput: () => void;
};

export const TodoFilter: React.FC<Props> = ({
  filteredBy,
  selectHandler,
  searchValue,
  inputHandler,
  isDeleteButtonAvailable,
  clearInput,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          onChange={selectHandler}
          value={filteredBy}
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
        value={searchValue}
        onChange={inputHandler}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {isDeleteButtonAvailable
        && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={clearInput}
              aria-label="clearSearchButton"
            />
          </span>
        )}
    </p>
  </form>
);
