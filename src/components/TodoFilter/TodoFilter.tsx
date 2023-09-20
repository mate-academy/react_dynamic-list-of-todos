import React from 'react';
import { TodoStatus } from '../../types/TodoStatus';

type Props = {
  selectFilter: TodoStatus,
  setSelectFilter: (sortStatus: TodoStatus) => void
  setFilterField: (e: string) => void;
  filterField: string,
};

export const TodoFilter: React.FC<Props> = ({
  setSelectFilter,
  selectFilter,
  setFilterField,
  filterField,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            className="is-capitalized"
            value={selectFilter}
            data-cy="statusSelect"
            onChange={(e) => {
              setSelectFilter(e.target.value as TodoStatus);
            }}
          >
            {Object.values(TodoStatus).map(option => (
              <option
                className="is-capitalized"
                key={option}
                value={option}
              >
                {option}
              </option>
            ))}
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          value={filterField}
          onChange={(event) => setFilterField(event.target.value)}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {filterField && (
            <button
              onClick={() => setFilterField('')}
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              aria-label="reset field"
            />
          )}
        </span>
      </p>
    </form>
  );
};
