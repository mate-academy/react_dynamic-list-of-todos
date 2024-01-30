import { useContext } from 'react';
import { TodosContext } from '../../contexts/TodoProvider';
import { FilterStatus } from '../../types/FilterStatus';

export const TodoFilter = () => {
  const {
    filterOptions: { query, status },
    filterByQuery,
    filterByStatus,
  } = useContext(TodosContext);

  const onFilterStatusChanged = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    if (event.target.value !== status) {
      filterByStatus(event.target.value as FilterStatus);
    }
  };

  const onQueryChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value !== query) {
      filterByQuery(event.target.value);
    }
  };

  const handleResetQueryButtonPressed = () => {
    filterByQuery('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={onFilterStatusChanged}>
            <option value={FilterStatus.All}>All</option>
            <option value={FilterStatus.Active}>Active</option>
            <option value={FilterStatus.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          value={query}
          onChange={onQueryChanged}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query
          && (
            <span className="icon is-right" style={{ pointerEvents: 'all' }}>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                onClick={handleResetQueryButtonPressed}
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
