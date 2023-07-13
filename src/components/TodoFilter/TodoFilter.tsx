import { Filter } from '../../types/Filter';

type Props = {
  onFilterChange: (value: React.ChangeEvent<HTMLSelectElement>) => void,
  onQueryChange: (value: React.ChangeEvent<HTMLInputElement>) => void,
  onQueryClear: () => void,
  query: string,
};

export const TodoFilter: React.FC<Props> = ({
  onFilterChange,
  onQueryChange,
  onQueryClear,
  query,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          onChange={onFilterChange}
        >
          {(Object.keys(Filter) as Array<keyof typeof Filter>).map(key => (
            <option
              value={Filter[key]}
              key={key}
            >
              {key}
            </option>
          ))}
          {/* <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option> */}
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
        onChange={onQueryChange}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {query && (
          // eslint-disable-next-line jsx-a11y/control-has-associated-label
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={onQueryClear}
          />
        )}

      </span>
    </p>
  </form>
);
