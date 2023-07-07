import { FilterBy } from '../../types/FilterBy';

interface Props {
  onChangeFilter: (event: React.ChangeEvent<HTMLSelectElement>) => void,
  query: string,
  onChangeQuery: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onClearQuery: () => void,
}

export const TodoFilter: React.FC<Props> = ({
  onChangeFilter,
  query,
  onChangeQuery,
  onClearQuery,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={onChangeFilter}>
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
          onChange={onChangeQuery}
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
              aria-label="Delete"
              onClick={onClearQuery}
            />
          </span>
        )}
      </p>
    </form>
  );
};
