import { FilterMethods } from '../../types/FilterMethods';

type Props = {
  query: string;
  onQueryChange: (query: string) => void;
  onSelectFilterMethod: (method: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  onQueryChange,
  onSelectFilterMethod,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          onChange={(event) => onSelectFilterMethod(event.target.value)}
        >
          <option value={FilterMethods.ALL}>All</option>
          <option value={FilterMethods.ACTIVE}>Active</option>
          <option value={FilterMethods.COMPLETED}>Completed</option>
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
        onChange={(event) => onQueryChange(event.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {query && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          <button
            data-cy="clearSearchButton"
            type="button"
            aria-label="Delete query"
            className="delete"
            onClick={() => onQueryChange('')}
          />
        </span>
      )}
    </p>
  </form>
);
