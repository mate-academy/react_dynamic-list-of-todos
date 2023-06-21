import { SortType } from '../../types/SortType';

type Props = {
  searchQuery: string;
  handleSearchQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  resetSearchQuery: () => void;
  sortType: string;
  setSortType: (value: SortType) => void;
};

export const TodoFilter: React.FC<Props> = ({
  searchQuery,
  handleSearchQueryChange,
  resetSearchQuery,
  sortType,
  setSortType,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            value={sortType}
            onChange={(event) => setSortType(event.target.value as SortType)}
            data-cy="statusSelect"
          >
            <option value={SortType.all}>All</option>
            <option value={SortType.active}>Active</option>
            <option value={SortType.completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          className="input"
          value={searchQuery}
          onChange={handleSearchQueryChange}
          data-cy="searchInput"
          type="text"
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {searchQuery && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              className="delete"
              onClick={resetSearchQuery}
              data-cy="clearSearchButton"
              type="button"
            />
          </span>
        )}
      </p>
    </form>
  );
};
