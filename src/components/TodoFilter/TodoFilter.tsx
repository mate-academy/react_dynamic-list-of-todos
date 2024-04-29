import { useContext } from 'react';
import { DispatchContext, StateContext } from '../../types/Store';

export const TodoFilter = () => {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);
  const { filterString, filterTodos } = state;

  const complitedTodo = (name: 'all' | 'completed' | 'active') => {
    dispatch({
      type: 'setFilterTodos',
      name,
    });
  };

  const deleteFilterString = () => {
    dispatch({
      type: 'setFilterString',
      payload: '',
    });
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterTodos}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
              complitedTodo(
                event.target.value as 'all' | 'completed' | 'active',
              )
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
          value={filterString}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            dispatch({ type: 'setFilterString', payload: event.target.value })
          }
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {filterString.length > 0 && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={deleteFilterString}
            />
          )}
        </span>
      </p>
    </form>
  );
};
