import { Filter, Filters } from '../../types/Filters';

type Props = {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
};

export const TodoFilter: React.FC<Props> = ({ filters, setFilters }) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filters.filter}
            onChange={event =>
              setFilters({
                ...filters,
                filter: event.target.value as Filter,
              })
            }
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
          value={filters.search}
          onChange={event =>
            setFilters({
              ...filters,
              search: event.target.value as Filter,
            })
          }
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {filters.search.length > 0 && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() =>
                setFilters({
                  ...filters,
                  search: '',
                })
              }
            />
          </span>
        )}
      </p>
    </form>
  );
};
