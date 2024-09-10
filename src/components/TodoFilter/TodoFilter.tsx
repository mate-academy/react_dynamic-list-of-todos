import { useContext } from 'react';
import { DispatchContext, Filter, StateContext } from '../../store/Store';

export const TodoFilter = () => {
  const dispatch = useContext(DispatchContext);
  const { filter, query } = useContext(StateContext);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter}
            onChange={event =>
              dispatch({
                type: 'SET_FILTER',
                payload: event.target.value as Filter,
              })
            }
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
          onChange={event =>
            dispatch({
              type: 'SET_QUERY',
              payload: event.target.value.toLowerCase(),
            })
          }
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
              onClick={() => {
                dispatch({ type: 'RESET_QUERY' });
              }}
            />
          </span>
        )}
      </p>
    </form>
  );
};
