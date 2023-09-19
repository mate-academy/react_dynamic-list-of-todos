import { Filter } from '../../types/Filter';

/* eslint-disable jsx-a11y/control-has-associated-label */
interface Props {
  onQueryChange: (value: string) => void
  onFilterChange: (value: Filter) => void
  query: string
  filter: string
}

export const TodoFilter: React.FC<Props> = ({
  onQueryChange, query, onFilterChange, filter,
}: Props) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={filter}
          onChange={(ev) => onFilterChange(ev.target.value as Filter)}
        >
          <option>All</option>
          <option>Active</option>
          <option>Completed</option>
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
        onChange={(e) => onQueryChange(e.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {query && (
          <button
            type="button"
            className="delete"
            data-cy="clearSearchButton"
            onClick={() => onQueryChange('')}
          />
        )}
      </span>
    </p>
  </form>
);
