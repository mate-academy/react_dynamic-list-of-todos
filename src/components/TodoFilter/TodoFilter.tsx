import { useContext } from 'react';
import {
  DispatchContext,
  StateContext,
} from '../../management/TodoContextProvider';

export const TodoFilter = () => {
  const { query } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(e) => {
              dispatch({ type: 'filter', payload: e.target.value });
            }}
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
          onChange={(e) => {
            dispatch({ type: 'search', payload: e.target.value });
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query && (
            // eslint-disable-next-line jsx-a11y/control-has-associated-label
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => {
                dispatch({ type: 'deletedSearch' });
              }}
            />
          )}
        </span>
      </p>
    </form>
  );
};
