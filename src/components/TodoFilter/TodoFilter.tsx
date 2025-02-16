import React, { useContext } from 'react';
import { DispatchContext, StateContext } from '../../Store';

export const TodoFilter: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const { searchQuery, filterValue } = useContext(StateContext);

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    dispatch({
      type: 'changeFilterValue',
      filterValue: value,
    });
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    dispatch({
      type: 'setSeqrchQuery',
      searchQuery: value,
    });
  };

  const hanldeResetSearch = () => {
    dispatch({
      type: 'setSeqrchQuery',
      searchQuery: '',
    });
  };

  return (
    <>
      <form className="field has-addons">
        <p className="control">
          <span className="select">
            <select
              data-cy="statusSelect"
              value={filterValue}
              onChange={handleChangeSelect}
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
            value={searchQuery}
            className="input"
            placeholder="Search..."
            onChange={handleChangeInput}
          />
          <span className="icon is-left">
            <i className="fas fa-magnifying-glass" />
          </span>

          {searchQuery && (
            <span className="icon is-right" style={{ pointerEvents: 'all' }}>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={hanldeResetSearch}
              />
            </span>
          )}
        </p>
      </form>
    </>
  );
};
