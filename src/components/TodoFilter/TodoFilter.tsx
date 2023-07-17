import { SelectFilter } from '../../types/SelectFilter';

type Props = {
  filterType: SelectFilter,
  setFilterType: (filterType: SelectFilter) => void,
  query: string,
  setQuery: (e: string) => void,
  applyQuery: (e: string) => void,
  cleanQuery: (s: string) => void,
};

export const TodoFilter: React.FC<Props> = ({
  filterType,
  setFilterType,
  query,
  setQuery,
  applyQuery,
  cleanQuery,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={filterType}
          onChange={({ target }) => (
            setFilterType(target.value as SelectFilter)
          )}
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
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          applyQuery(e.target.value);
        }}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {query && (
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => {
              cleanQuery('');
              setQuery('');
            }}
            aria-label="Clear Search Button"
          />
        )}
      </span>
    </p>
  </form>
);
