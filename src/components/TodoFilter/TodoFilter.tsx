import { FilterStatus } from '../../types/FilterStatus';

type Props = {
  statusFilter: FilterStatus;
  searchQuery: string;
  OnSetStatusFiler: (newFilter: FilterStatus) => void;
  OnSetSearchQuery: (newQuery: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  statusFilter,
  searchQuery,
  OnSetStatusFiler,
  OnSetSearchQuery,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={event =>
              OnSetStatusFiler(event.target.value as FilterStatus)
            }
            value={statusFilter}
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
          value={searchQuery}
          onChange={event => OnSetSearchQuery(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {searchQuery && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => OnSetSearchQuery('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
