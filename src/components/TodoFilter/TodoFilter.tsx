import React from 'react';
// eslint-disable-next-line import/no-cycle
import { SortFieldEnum } from '../../App';

type Props = {
  updateSearchField: (str: string) => void;
  updateSortField: (
    str: (typeof SortFieldEnum)[keyof typeof SortFieldEnum]
  ) => void;
  searchField: string;
  sortField: (typeof SortFieldEnum)[keyof typeof SortFieldEnum];
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
              // eslint-disable-next-line implicit-arrow-linebreak
              updateSortField(
                event.target
                  .value as (typeof SortFieldEnum)[keyof typeof SortFieldEnum],
              )}
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
            // eslint-disable-next-line jsx-a11y/control-has-associated-label
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
