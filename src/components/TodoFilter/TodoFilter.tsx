import { FilterType } from '../../types/FilterType';

type Props = {
  statusFilter: FilterType;
  setStatusFilter: (value: FilterType) => void;
  searchFilter: string;
  setSearchFilter: (value: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  statusFilter,
  setStatusFilter,
  searchFilter,
  setSearchFilter,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value as FilterType)}
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
          value={searchFilter}
          onChange={e => setSearchFilter(e.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {searchFilter && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setSearchFilter('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
