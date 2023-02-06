import React from 'react';
import { FilterTypes } from '../../types/FilterTypes';

interface Props {
  filterType: FilterTypes,
  setFilterType: (filterType: FilterTypes) => void,
  query: string,
  setQuery: (query: string) => void,
}

export const TodoFilter: React.FC<Props> = (props) => {
  const {
    filterType,
    setFilterType,
    query,
    setQuery,
  } = props;

  const onSelectOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
    switch (event.target.value) {
      case FilterTypes.All:
        setFilterType(FilterTypes.All);
        break;

      case FilterTypes.Active:
        setFilterType(FilterTypes.Active);
        break;

      case FilterTypes.Completed:
        setFilterType(FilterTypes.Completed);
        break;

      default:
        break;
    }
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterType}
            onChange={onSelectOption}
          >
            <option value={FilterTypes.All}>All</option>
            <option value={FilterTypes.Active}>Active</option>
            <option value={FilterTypes.Completed}>Completed</option>
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
          onChange={event => setQuery(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setQuery('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
