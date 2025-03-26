import { FILTER } from '../../helpers/enum';

type Props = {
  query: string;
  filter: FILTER;
  onQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFilterChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  resetQuery: () => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  filter,
  onQueryChange,
  onFilterChange,
  resetQuery,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter}
            onChange={onFilterChange}
          >
            <option value={FILTER.all}>All</option>
            <option value={FILTER.planing}>Active</option>
            <option value={FILTER.done}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          value={query}
          onChange={event => onQueryChange(event)}
          className="input"
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>
        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={resetQuery}
            />
          </span>
        )}
      </p>
    </form>
  );
};
