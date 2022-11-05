import { FC, useContext } from 'react';
import { SortTypes } from '../../types/SortTypes';
import { TodoContext } from '../TodoContext';

export const TodoFilter: FC = () => {
  const {
    query,
    handleSearch,
    clearSearchBar,
  } = useContext(TodoContext);

  const { changeSortType } = useContext(TodoContext);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={changeSortType}
          >
            <option value={SortTypes.ALL}>All</option>
            <option value={SortTypes.ACTIVE}>Active</option>
            <option value={SortTypes.COMPLETED}>Completed</option>
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
            <button
              aria-label="delete"
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
