import { FilterOptions } from '../../types/FilterOptions';

interface Props{
  handleClick: (filter: FilterOptions) => void,
  handleQuery: (value: string) => void,
  query: string,
  handleDelete: () => void,
}

export const TodoFilter:React.FC<Props> = ({
  handleClick, handleQuery, query, handleDelete,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          onChange={(event) => handleClick(event.target.value as FilterOptions)}
        >
          <option value={FilterOptions.All}>All</option>
          <option value={FilterOptions.Active}>Active</option>
          <option value={FilterOptions.Completed}>Completed</option>
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
        onChange={event => handleQuery(event.target.value.trim())}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {query.length > 0 && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={handleDelete}
          />
        </span>
      )}
    </p>
  </form>
);
