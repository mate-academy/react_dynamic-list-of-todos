import { memo } from 'react';
import { SearchType } from '../../types/filter-type';

interface Props {
  searchQuery: string,
  setSearchQuery: (query: string) => void,
  completedFilter: SearchType,
  setCompletedFilter: (searchType: SearchType) => void;
  hasFilters: boolean,
  onClear: () => void,
}

// const mapCompletedFilter = (value: SearchType): SearchType => {
//   switch (value) {
//     case SearchType.active:
//       return SearchType.active;
//     case SearchType.completed:
//       return SearchType.completed;
//     case SearchType.all:
//       return SearchType.all;

//     default:
//       return SearchType.all;
//   }
// };

export const TodoFilter: React.FC<Props> = memo(({
  searchQuery,
  setSearchQuery,
  completedFilter,
  setCompletedFilter,
  hasFilters,
  onClear,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={completedFilter}
          onChange={event => setCompletedFilter(
            event.target.value as SearchType,
          )}
        >
          <option value={SearchType.all}>All</option>
          <option value={SearchType.active}>Active</option>
          <option value={SearchType.completed}>Completed</option>
        </select>
      </span>
    </p>

    <p className="control is-expanded has-icons-left has-icons-right">
      <input
        data-cy="searchInput"
        type="text"
        className="input"
        placeholder="Search..."
        value={searchQuery}
        onChange={event => setSearchQuery(event.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {hasFilters
        && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={onClear}
            />
          </span>
        )}
    </p>
  </form>
));
