import { useCallback } from 'react';
import { useTodos } from '../Context';

function debounce(
  callback: React.Dispatch<React.SetStateAction<string>>,
  delay: number,
) {
  let timerId = 0;

  return (...args: any[]) => {
    window.clearTimeout(timerId);

    timerId = window.setTimeout(() => {
      callback(args[0]);
    }, delay);
  };
}

export const TodoFilter = () => {
  const {
    setSearchText,
    searchText,
    setFilter,
    filter,
    setAppliedSearchText,
    appliedSearchText,
  } = useTodos();

  const appliedQuery = useCallback(debounce(setAppliedSearchText, 500), []);

  const handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    appliedQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchText('');
    setAppliedSearchText('');
  };

  const handleFilterChange = (type: string) => {
    setFilter(type);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            defaultValue={filter}
            onChange={(e) => handleFilterChange(e.target.value)}
          >
            <option
              value="all"
            >
              All
            </option>
            <option
              value="active"
            >
              Active
            </option>
            <option
              value="completed"
            >
              Completed
            </option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          onChange={handleSearchTextChange}
          value={searchText}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>
        {appliedSearchText.length !== 0 && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClearSearch}
            />
          </span>
        )}
      </p>
    </form>
  );
};
