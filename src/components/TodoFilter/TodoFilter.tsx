import { useContext } from 'react';
import { GlobalContext } from '../../reducer';

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

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={state.filter}
            onChange={onChangeHandler}
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
          value={state.filterBySearch}
          onChange={onChangeSearch}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {state.filterBySearch && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => dispatch({ type: 'SearchLine', filter: '' })}
            />
          </span>
        )}
      </p>
    </form>
  );
};
