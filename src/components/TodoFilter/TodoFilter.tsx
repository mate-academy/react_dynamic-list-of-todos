import React from 'react';

type Props = {
  setOption: (v: string) => void;
  option: string;
  setFilterText: (v: string) => void;
  filterText: string;
};

export const TodoFilter: React.FC<Props> = ({
  setOption,
  option,
  setFilterText,
  filterText,
}) => {
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(e.target.value);
  };

  return (
    <form onSubmit={e => e.preventDefault()} className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            onChange={e => setOption(e.target.value)}
            value={option}
            data-cy="statusSelect"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          onChange={handleInput}
          value={filterText}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {filterText && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              onClick={() => setFilterText('')}
              data-cy="clearSearchButton"
              type="button"
              className="delete"
            />
          </span>
        )}
      </p>
    </form>
  );
};
