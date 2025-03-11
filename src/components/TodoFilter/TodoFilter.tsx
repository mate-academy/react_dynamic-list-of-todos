import { Filter } from '../../types/Filter';

type FilterProps = {
  applyFilter: (filter: Filter) => void;
  searchValue: string;
  applySearch: (searchInput: string) => void;
};

export const TodoFilter: React.FC<FilterProps> = ({
  applyFilter,
  applySearch,
  searchValue,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={e => applyFilter(e.target.value as Filter)}
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
          value={searchValue}
          onChange={event => applySearch(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {searchValue.length && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => applySearch('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
