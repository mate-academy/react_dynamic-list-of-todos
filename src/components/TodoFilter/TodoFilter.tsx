import { useContext } from 'react';
import {
  ActionTypes,
  DispatchContext,
  SelectOptions,
  StateContext,
} from '../../context/TodoContext';

export const TodoFilter = () => {
  const dispatch = useContext(DispatchContext);
  const { query, filter } = useContext(StateContext);
  const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFilter = e.target.value as SelectOptions;

    dispatch({ type: ActionTypes.SET_SELECT, payload: selectedFilter });
  };

  const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;

    dispatch({ type: ActionTypes.SET_QUERY, payload: text });
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter}
            onChange={onChangeSelect}
          >
            <option value={SelectOptions.All}>All</option>
            <option value={SelectOptions.Active}>Active</option>
            <option value={SelectOptions.Completed}>Completed</option>
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
          onChange={onChangeField}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {!!query.length && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() =>
                dispatch({ type: ActionTypes.SET_QUERY, payload: '' })
              }
            />
          </span>
        )}
      </p>
    </form>
  );
};
