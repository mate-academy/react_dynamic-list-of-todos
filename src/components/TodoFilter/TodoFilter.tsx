import { FilterBy } from '../../types/FilterBy';

interface Props {
  onSetFilter: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onType: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
  query: string;
}

export const TodoFilter: React.FC<Props> = ({
  onSetFilter,
  onType,
  onReset,
  query,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select data-cy="statusSelect" onChange={onSetFilter}>
          <option value={FilterBy.All}>All</option>
          <option value={FilterBy.Active}>Active</option>
          <option value={FilterBy.Completed}>Completed</option>
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
        onChange={onType}
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
            onClick={onReset}
          />
        </span>
      )}
    </p>
  </form>
);
