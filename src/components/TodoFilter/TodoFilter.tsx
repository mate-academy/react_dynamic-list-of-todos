import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { StateContext } from '../../context/stateContext';
import { TodoFilterStatus } from '../../types/StoreState';

export const TodoFilter = () => {
  const { dispatch } = useContext(StateContext);
  const [search, setSearch] = useState<string>('');
  const [status, setStatus] = useState<TodoFilterStatus>(TodoFilterStatus.All);

  const handleClear = () => {
    setSearch('');
    setStatus(TodoFilterStatus.All);
  };

  useEffect(() => {
    dispatch({
      type: 'search',
      payload: {
        search,
        status,
      },
    });
  }, [search, status, dispatch]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(event: ChangeEvent<HTMLSelectElement>) =>
              setStatus(event.target.value as TodoFilterStatus)
            }
            value={status}
          >
            <option value={TodoFilterStatus.All}>All</option>
            <option value={TodoFilterStatus.Active}>Active</option>
            <option value={TodoFilterStatus.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setSearch(event.target.value)
          }
          value={search}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {search !== '' && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClear}
            />
          )}
        </span>
      </p>
    </form>
  );
};
