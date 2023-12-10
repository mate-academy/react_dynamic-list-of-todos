import { Filter } from '../../types/Filter';

type Props = {
  filter: string,
  setFilter: (value: string) => void,
  searchQuery: string,
  setSearch: (value: string) => void,
};

export const TodoFilter: React.FC<Props> = ({
  filter,
  setFilter,
  searchQuery,
  setSearch,
}) => {
  return (
    <form className="field has-addons">
      <div className="control">
        <div className="select">
          <select
            data-cy="statusSelect"
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
          >
            <option value={Filter.all}>
              All
            </option>
            <option value={Filter.active}>
              Active
            </option>
            <option value={Filter.completed}>
              Completed
            </option>
          </select>
        </div>
      </div>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={searchQuery}
          onChange={(event) => setSearch(event.target.value)}
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
              onClick={() => setSearch('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
