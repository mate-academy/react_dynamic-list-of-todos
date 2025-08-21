import React from 'react';

type Props = {
  query: string;
  handleFilterInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  clearInputQuery: () => void;
  chosenSelectItem: string;
  handleOnSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  handleFilterInput,
  clearInputQuery,
  chosenSelectItem,
  handleOnSelect,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={chosenSelectItem}
          onChange={handleOnSelect}
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
        onChange={handleFilterInput}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        {query !== '' && (
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={clearInputQuery}
          />
        )}
      </span>
    </p>
  </form>
);
