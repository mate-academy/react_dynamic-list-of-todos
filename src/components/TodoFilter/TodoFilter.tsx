import { FilteringMode } from '../../types/FilteringMode';

/* eslint-disable jsx-a11y/control-has-associated-label */
interface Props {
  setFilteringMode: (arg0: FilteringMode) => void;
  setSearchQuery: (arg0: string) => void,
  searchQuery: string,
}

export const TodoFilter: React.FC<Props>
  = ({ setFilteringMode, setSearchQuery, searchQuery }) => {
    return (
      <form className="field has-addons">
        <p className="control">
          <span className="select">
            <select
              data-cy="statusSelect"
              onChange={change => setFilteringMode(
                change.target.value as FilteringMode,
              )}
            >
              <option value={FilteringMode.All}>All</option>
              <option value={FilteringMode.Active}>Active</option>
              <option value={FilteringMode.Completed}>Completed</option>
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
            onChange={change => setSearchQuery(change.target.value)}
          />
          <span className="icon is-left">
            <i className="fas fa-magnifying-glass" />
          </span>

          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {searchQuery && (
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={() => setSearchQuery('')}
              />
            )}
          </span>
        </p>
      </form>
    );
  };
