import { Filter } from '../../types/Filter';

type Props = {
  query: string,
  setQuery: (query: string) => void,
  setSelectedFilter: (filter: string) => void,
};

export const TodoFilter: React.FC<Props> = ({
  query,
  setQuery,
  setSelectedFilter,
}) => {
  const { All, Active, Completed } = Filter;

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(event) => setSelectedFilter(event.target.value)}
          >
            <option
              value={All}
            >
              All
            </option>
            <option
              value={Active}
            >
              Active
            </option>
            <option
              value={Completed}
            >
              Completed
            </option>
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
          onChange={(event) => setQuery(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {!!query && (
            <button
              aria-label="reset"
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setQuery('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
