import {
  Dispatch,
  SetStateAction,
  FC,
  ChangeEvent,
} from 'react';

interface TodoFilterProps {
  searchInput: string,
  setSearchInput: Dispatch<SetStateAction<string>>;
  setFilterMode: Dispatch<SetStateAction<string>>;
}

export const TodoFilter: FC<TodoFilterProps>
  = ({
    searchInput,
    setSearchInput,
    setFilterMode,
  }) => {
    const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      setSearchInput(e.target.value);
    };

    const clearSearchInput = () => {
      setSearchInput('');
    };

    const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
      setFilterMode(e.target.value);
    };

    return (
      <form className="field has-addons">
        <p className="control">
          <span className="select">
            <select
              data-cy="statusSelect"
              onChange={handleFilterChange}
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </span>
        </p>

        <p className="control is-expanded has-icons-left has-icons-right">
          <input
            value={searchInput}
            data-cy="searchInput"
            type="text"
            className="input"
            placeholder="Search..."
            onChange={handleSearchInputChange}
          />
          <span className="icon is-left">
            <i className="fas fa-magnifying-glass" />
          </span>

          {!!searchInput.length && (
            <span className="icon is-right" style={{ pointerEvents: 'all' }}>

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                onClick={clearSearchInput}
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
