import React, { useContext } from 'react';
import { DispatchContext, StateContext } from '../../Store';
import { Filter } from '../../types/Filter';

export const TodoFilter = () => {
  const dispatch = useContext(DispatchContext);
  const { filter: { query } } = useContext(StateContext);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  const handleFilterOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: 'setFilterOption',
      payload: event.target.value as Filter,
    });
  };

  const handleFilterQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'setFilterQuery',
      payload: event.target.value,
    });
  };

  return (
    <form
      className="field has-addons"
      onSubmit={handleSubmit}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleFilterOption}
          >
            {Object.entries(Filter).map(([key, value]) => (
              <option key={key} value={value}>{key}</option>
            ))}
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          type="text"
          data-cy="searchInput"
          value={query}
          placeholder="Search..."
          className="input"
          onChange={handleFilterQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query.length > 0 && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => dispatch({ type: 'setFilterQuery', payload: '' })}
            />
          </span>
        )}
      </p>
    </form>
  );
};
