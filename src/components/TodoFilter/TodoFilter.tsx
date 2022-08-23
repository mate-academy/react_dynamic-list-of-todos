import { Sort } from '../../types/Sort';

type Props = {
  setQuery: (input: string) => void,
  setStatus: (input: string) => void,
  query: string,
  status: Sort | string,
};

export const TodoFilter: React.FC<Props> = ({
  setQuery,
  setStatus,
  query,
  status,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={({ target }) => {
              setStatus(target.value);
            }}
          >
            <option value={Sort.ALL}>All</option>
            <option value={Sort.ACTIVE}>Active</option>
            <option value={Sort.COMPLETED}>Completed</option>
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
          onChange={({ target }) => {
            setQuery(target.value);
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
              onClick={() => setQuery('')}
            >
              {' '}
              Hello
            </button>
          )}

        </span>
      </p>
    </form>
  );
};
