import { FC, useContext, useCallback } from 'react';
import { UserContext } from '../UserContext';

function debounce(f:(finalQuery: string) => void, delay: number) {
  let timerId: NodeJS.Timeout;

  return (arg: string) => {
    clearTimeout(timerId);
    timerId = setTimeout(f, delay, arg);
  };
}

export const TodoFilter: FC = () => {
  const {
    setSortType,
    query,
    setQuery,
    setAppliedQuery,
  } = useContext(UserContext);
  const changeSortType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setSortType(value);
  };

  const applyQuery = useCallback(debounce(setAppliedQuery, 1000),
    []);
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    applyQuery(event.target.value);
  };

  const clearSearchBar = () => {
    setQuery('');
    setAppliedQuery('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={changeSortType}
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
          onChange={handleSearch}
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
              onClick={clearSearchBar}
            />
          </span>
        )}
      </p>
    </form>
  );
};
