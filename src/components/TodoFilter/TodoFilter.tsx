import { FilteredBy } from '../../types/Filter';

type Props = {
  onSearchWordChange: (word: string) => void;
  onFilterChange: (filterOption: FilteredBy) => void;
  searchWord: string;
};

export const TodoFilter: React.FC<Props> = ({
  onSearchWordChange,
  onFilterChange,
  searchWord,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={
              (event) => onFilterChange(event.target.value as FilteredBy)
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
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={searchWord}
          onChange={(event) => onSearchWordChange(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>
        {searchWord && (
          <span
            className="icon is-right"
            style={{ pointerEvents: 'all' }}
            id="button-label"
          >
            <button
              data-cy="clearSearchButton"
              aria-labelledby="button-label"
              type="button"
              className="delete"
              onClick={() => onSearchWordChange('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
