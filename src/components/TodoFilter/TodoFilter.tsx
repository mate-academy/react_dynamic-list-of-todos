import { ChangeEvent, useContext } from 'react';
import debonce from 'lodash.debounce';
import { DispatchContext } from '../../State/State';
import { Filter } from '../../types/Filter';

export const TodoFilter = () => {
  const dispatch = useContext(DispatchContext);

  const applyQuery = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'query', payload: event.target.value });
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(event) => {
              dispatch({
                type: 'setFilter',
                payload: event.target.value as Filter,
              });
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
          onChange={debonce(applyQuery, 1000)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
          />
        </span>
      </p>
    </form>
  );
};
