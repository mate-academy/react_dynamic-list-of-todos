import React from 'react';
import { FilterType } from '../../types/FilterType';

interface Props {
  setFilter: React.Dispatch<React.SetStateAction<FilterType>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const { All, Active, Completed } = FilterType;

export const TodoFilter: React.FC<Props> = ({
  setFilter,
  setSearchQuery,
  searchQuery,
}) => {
  return (
    <form
      className="field has-addons"
      onSubmit={(event) => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(event) => setFilter(event.target.value as FilterType)}
          >
            <option value={All}>All</option>
            <option value={Active}>Active</option>
            <option value={Completed}>Completed</option>
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
          onChange={(event) => setSearchQuery(event.target.value)}
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
              onClick={() => setSearchQuery('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
