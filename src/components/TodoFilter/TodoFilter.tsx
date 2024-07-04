import { Filters } from '../../App';

type Props = {
  query: string;
  setQuery: (event: React.ChangeEvent<HTMLInputElement>) => void;
  filter: Filters;
  setTodosFilter: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  clearQuery: () => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  setQuery,
  filter,
  setTodosFilter,
  clearQuery,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          name="select"
          value={filter}
          onChange={setTodosFilter}
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
        onChange={setQuery}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        {query.length > 0 && (
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={clearQuery}
          />
        )}
      </span>
    </p>
  </form>
);
