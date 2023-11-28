import { useContext } from 'react';
import { TodoContext } from '../TodoContext';
import { FilterOption } from '../../types/FilterOption';

export const TodoFilter = () => {
  const { setFilterOption, query, setQuery } = useContext(TodoContext);
  const isDeleteBtnVisible = query.length > 0;

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            onChange={(event) => (
              setFilterOption(event.target.value as FilterOption)
            )}
            data-cy="statusSelect"
          >
            <option value={FilterOption.All}>ALL</option>
            <option value={FilterOption.Active}>Active</option>
            <option value={FilterOption.Completed}>Completed</option>
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
          onChange={event => setQuery(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {isDeleteBtnVisible && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setQuery('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
