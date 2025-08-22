import React from 'react';
import cn from 'classnames';

type Props = {
  handleOptionSort: (event: string) => void;
  searchQuery: string;
  handleSetSearchQuery: (event: string) => void;
  handleResetQuery: () => void;
  groupBy: string;
};
// React.ChangeEvent<HTMLInputElement
export const TodoFilter: React.FC<Props> = ({
  handleOptionSort,
  searchQuery,
  handleSetSearchQuery,
  handleResetQuery,
  groupBy,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            value={groupBy}
            data-cy="statusSelect"
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
              handleOptionSort(event.target.value)
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
          value={searchQuery}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleSetSearchQuery(event.target.value)
          }
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {searchQuery && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleResetQuery}
            />
          )}
        </span>
      </p>
    </form>
  );
};
