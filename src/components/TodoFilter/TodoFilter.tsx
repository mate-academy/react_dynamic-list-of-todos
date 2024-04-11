import React, { useContext } from 'react';
import { DispatchContext, StateContext } from '../../context/ReduxContext';

export const TodoFilter = () => {
  const { clearQuery, query } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            onChange={event =>
              dispatch({ type: 'select', value: event.target.value })
            }
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
          onChange={event =>
            dispatch({ type: 'filter', value: event.target.value })
          }
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={query}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {clearQuery && query.length ? (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              onClick={() => dispatch({ type: 'clearQuery' })}
              data-cy="clearSearchButton"
              type="button"
              className="delete"
            />
          </span>
        ) : (
          ''
        )}
      </p>
    </form>
  );
};
