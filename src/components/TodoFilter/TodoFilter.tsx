import {
  ChangeEvent,
  useContext,
} from 'react';
import debounce from 'lodash.debounce';
import { DispatchContext, StateContext } from '../../State/State';
import { Filter } from '../../types/Filter';

export const TodoFilter = () => {
  const dispatch = useContext(DispatchContext);
  const { query } = useContext(StateContext);

  const applyQuery = debounce((event: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'appliedQuery', payload: event.target.value.trim() });
  }, 1000);

  const deleteQuery = () => {
    dispatch({ type: 'query', payload: '' });
    dispatch({ type: 'appliedQuery', payload: '' });
  };

  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'query', payload: event?.target.value.trim() });
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
          value={query}
          onChange={event => {
            applyQuery(event);
            handleQuery(event);
          }}
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
              onClick={deleteQuery}
            />
          </span>
        )}
      </p>
    </form>
  );
};
