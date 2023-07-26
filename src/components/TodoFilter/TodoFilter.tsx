/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/jsx-curly-newline */
import React from 'react';

type Props = {
  updateSearchField: (str: string) => void;
  updateSortField: (str: 'completed' | 'active' | '') => void;
  searchField: string;
  sortField: 'completed' | 'active' | '';
};

export const TodoFilter: React.FC<Props> = ({
  updateSearchField,
  updateSortField,
  searchField,
  sortField,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(event) =>
              updateSortField(event.target.value as 'completed' | 'active' | '')
            }
            value={sortField}
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
          value={searchField}
          onChange={(event) => updateSearchField(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {searchField && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => updateSearchField('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
