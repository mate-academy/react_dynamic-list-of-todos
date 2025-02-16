import React from "react";

type Props = {
  searchInputValue: string;
  setSearchInputValue: (todos: string) => void;
  selectedOption: string;
  setSelectedOption: (option: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  searchInputValue,
  setSearchInputValue,
  selectedOption,
  setSelectedOption,
}) => {


  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            value={selectedOption}
            onChange={e => setSelectedOption(e.target.value)}
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
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={searchInputValue}
          onChange={e => setSearchInputValue(e.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>
        {searchInputValue && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setSearchInputValue('')}
            />
          </span>
        )
        }
      </p>
    </form>
  );
};
