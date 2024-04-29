import React, { ChangeEvent, FormEvent } from 'react';

type TodoFilterProps = {
  query: string;
  onReset: () => void;
  onGetStatusSelect: (e: ChangeEvent<HTMLSelectElement>) => void;
  onChangeQuery: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const TodoFilter: React.FC<TodoFilterProps> = ({
  query,
  onReset,
  onGetStatusSelect,
  onChangeQuery,
}) => {
  const handlerSumbit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handlerSumbit} className="field has-addons">
      <p className="control">
        <span className="select">
          <select onChange={onGetStatusSelect} data-cy="statusSelect">
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          onChange={onChangeQuery}
          data-cy="searchInput"
          type="text"
          value={query}
          className="input"
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {query && (
            <button
              onClick={onReset}
              data-cy="clearSearchButton"
              type="button"
              className="delete"
            />
          )}
        </span>
      </p>
    </form>
  );
};
