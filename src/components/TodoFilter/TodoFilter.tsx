import { Condition } from '../../types/Condition';

type Props = {
  query: string;
  setQuery: (value: string) => void;
  setFilterType: (value: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  setQuery,
  setFilterType,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          onChange={(event) => setFilterType(event.target.value)}
        >
          <option value={Condition.all}>All</option>
          <option value={Condition.active}>Active</option>
          <option value={Condition.completed}>Completed</option>
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

      {query && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => setQuery('')}
            aria-label="delete-query"
          />
        </span>
      )}
    </p>
  </form>
);
