import { SortTypes } from '../../types/SortTypes';

type TodoFilterProps = {
  query: string,
  onChangeQuery: (value: string) => void;
  selectedStatus: string,
  onSelectStatus: (value: string) => void,
};

export const TodoFilter: React.FC<TodoFilterProps> = ({
  query,
  onChangeQuery,
  onSelectStatus,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(event) => onSelectStatus(event.target.value)}
          >
            {Object.entries(SortTypes).map(([key, value]) => (
              <option
                value={value}
              >
                {key}
              </option>
            ))}
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
          onChange={(event) => onChangeQuery(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query && (
            <button
              aria-label="delete button"
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => onChangeQuery('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
