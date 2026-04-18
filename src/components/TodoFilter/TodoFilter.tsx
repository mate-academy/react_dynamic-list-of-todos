import React from 'react';
// import { getTodos } from '../../api';

type Props = {
  query: string;
  setQuery: (str: string) => void;
  handleInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  restoreTodos: () => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  handleInput,
  setQuery,
  handleSelect,
  restoreTodos,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleSelect}>
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
          value={query}
          onChange={handleInput}
          placeholder="Search..."
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
              onClick={() => {
                setQuery('');
                restoreTodos();
              }}
            />
          )}
        </span>
      </p>
    </form>
  );
};
