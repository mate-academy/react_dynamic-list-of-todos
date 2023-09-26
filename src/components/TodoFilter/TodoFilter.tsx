/* eslint-disable jsx-a11y/control-has-associated-label */
import { FilterType } from "../../types/Todo";
interface TodoFilterProps {
  setFilter: (filter: FilterType) => void;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  handleClearQuery: () => void;
}

export const TodoFilter: React.FC<TodoFilterProps> = ({
  setFilter,
  query,
  setQuery,
  handleClearQuery,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          title="Filter"
          onChange={(e) => setFilter(e.target.value as FilterType)}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </span>
    </p>

    <p className="control is-expanded has-icons-left has-icons-right">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        data-cy="searchInput"
        type="text"
        className="input"
        placeholder="Search..."
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
            onClick={handleClearQuery}
          />
        </span>
      )}
    </p>
  </form>
);
