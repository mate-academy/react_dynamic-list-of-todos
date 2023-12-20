import { SortType } from '../../types/SortType';

type Props = {
  query: string;
  setQuery: (v: string) => void;
  sortType: string;
  setSortType: (v: SortType) => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  setQuery,
  sortType,
  setSortType,
}) => (
  <>
    <form
      className="field has-addons"
      action="/api/todos"
      method="POST"
    >
      <div className="control">
        <label className="select" htmlFor="select-id">
          <select
            data-cy="statusSelect"
            value={sortType}
            onChange={(event) => setSortType(event.target.value as SortType)}
          >
            <option value={SortType.All}>All</option>
            <option value={SortType.Active}>Active</option>
            <option value={SortType.Completed}>Completed</option>
          </select>
        </label>
      </div>

      <label className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
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
      </label>
    </form>
  </>
);
