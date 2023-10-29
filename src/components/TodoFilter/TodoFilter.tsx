/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { FilterParams } from '../../types/FilterParams';

type Props = {
  filterParam: FilterParams,
  changeParams: (event: React.ChangeEvent<HTMLSelectElement>) => void,
  querry: string,
  querryChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  deletequerry: () => void,
};

export const TodoFilter: React.FC<Props> = ({
  filterParam,
  changeParams = () => {},
  querry,
  querryChange = () => {},
  deletequerry = () => {},
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterParam}
            onChange={changeParams}
          >
            <option value={FilterParams.all}>All</option>
            <option value={FilterParams.active}>Active</option>
            <option value={FilterParams.completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={querry}
          onChange={querryChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {querry && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={deletequerry}
            />
          </span>
        )}

      </p>
    </form>
  );
};
