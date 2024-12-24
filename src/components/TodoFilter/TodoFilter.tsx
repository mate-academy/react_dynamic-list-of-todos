import React from 'react';
import { FilterType } from '../../App';

type Props = {
  setFilter: (value: string) => void;
  searchFilter: string;
  setSearchFilter: (value: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  setFilter,
  searchFilter,
  setSearchFilter,
}) => {
  const deleteSearch = () => {
    setSearchFilter('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={e => setFilter(e.target.value)}
          >
            <option value={FilterType.All}>All</option>
            <option value={FilterType.Active}>Active</option>
            <option value={FilterType.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={searchFilter}
          onChange={e => setSearchFilter(e.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span
          className="icon is-right"
          style={{ pointerEvents: FilterType.All }}
        >
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {searchFilter && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={deleteSearch}
            />
          )}
        </span>
      </p>
    </form>
  );
};
