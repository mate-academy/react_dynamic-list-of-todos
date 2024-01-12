import React, { useContext } from 'react';
import { DispatchContext, StateContext } from '../../store/Store';
import { ActionTypes } from '../../store/ActionTypes';
import { Status } from '../../types/Status';

export const TodoFilter = () => {
  const dispatch = useContext(DispatchContext);
  const { status, query } = useContext(StateContext);

  const changeStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: ActionTypes.ChangeStatus,
      payload: {
        status: event.target.value as Status,
      },
    });
  };

  const changeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: ActionTypes.ChangeQuery,
      payload: {
        query: event.target.value,
      },
    });
  };

  const handleDeleteButtonClick = () => {
    dispatch({
      type: ActionTypes.ChangeQuery,
      payload: {
        query: '',
      },
    });
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={changeStatus}
          >
            <option value={Status.All}>All</option>
            <option value={Status.Active}>Active</option>
            <option value={Status.Completed}>Completed</option>
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
          onChange={changeQuery}
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
              onClick={handleDeleteButtonClick}
            />
          </span>
        )}
      </p>
    </form>
  );
};
