import { Filter } from '../../types/Filter';

type Props = {
  filter: Filter;
  changeFilter: (givenFilter: Filter) => void;
  filterQuery: string;
  changeFilterQuery: (text: string) => void;
  resetFilters: () => void;
};

export const TodoFilter: React.FC<Props> = ({
  filter,
  changeFilter,
  filterQuery,
  changeFilterQuery,
  resetFilters,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={filter}
          onChange={event => {
            changeFilter(event.target.value as Filter);
          }}
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
        value={filterQuery}
        placeholder="Search..."
        onChange={event => {
          changeFilterQuery(event.target.value);
        }}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        {filterQuery && (
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => resetFilters()}
          />
        )}
      </span>
    </p>
  </form>
);
