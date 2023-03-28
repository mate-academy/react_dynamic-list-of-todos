import { useContext } from 'react';
import { GlobalContext } from '../../reducer';

export enum State {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

export const TodoFilter = () => {
  const [state, dispatch] = useContext(GlobalContext);
  const onChangeHandler = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    dispatch({ type: 'TypeFilter', filter: event.target.value });
  };

  const onChangeSearch = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    dispatch({ type: 'SearchLine', filter: event.target.value });
  };

  const resetSearchLine = () => {
    dispatch({ type: 'SearchLine', filter: '' });
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={state.filter}
            onChange={onChangeHandler}
          >
            <option value={State.ALL}>All</option>
            <option value={State.ACTIVE}>Active</option>
            <option value={State.COMPLETED}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={state.filterBySearch}
          onChange={onChangeSearch}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {state.filterBySearch && (
          <span
            className="icon is-right"
            style={{ pointerEvents: 'all' }}
          >
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={resetSearchLine}
              aria-label="Очистити поле пошуку"
            />
          </span>
        )}
      </p>
    </form>
  );
};
