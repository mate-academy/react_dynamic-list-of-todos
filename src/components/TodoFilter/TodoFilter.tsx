import { Filter } from '../../types/Filter';

interface Props {
  handleQuery: (e: Filter) => void,
  handleSearchValue: (s: string) => void,
  query: string,
}

export const TodoFilter: React.FC<Props> = ({
  handleQuery,
  handleSearchValue,
  query,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          onChange={e => handleQuery(e.target.value as Filter)}
        >
          <option value={Filter.All}>All</option>
          <option value={Filter.Active}>Active</option>
          <option value={Filter.Completed}>Completed</option>
        </select>
      </span>
    </p>

    <p className="control is-expanded has-icons-left has-icons-right">
      <input
        data-cy="searchInput"
        type="text"
        className="input"
        placeholder="Search..."
        onChange={(e) => handleSearchValue(e.target.value)}
        value={query}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>

        {
          query && (
          /* eslint-disable-next-line jsx-a11y/control-has-associated-label */
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => {
                handleSearchValue('');
              }}
            />
          )
        }
      </span>
    </p>
  </form>
);
