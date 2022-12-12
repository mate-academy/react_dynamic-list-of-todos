import { FilterType } from '../../types/FilterType';

interface Props {
  query: string,
  onChangeQuery: (query: string) => void,
  filter: FilterType,
  onSelectFilter: (filter: FilterType) => void,
}

export const TodoFilter: React.FC<Props> = ({
  query,
  onChangeQuery,
  filter,
  onSelectFilter,
}) => {
  const handleFilterSelection = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    switch (event.target.value) {
      case FilterType.ACTIVE:
        onSelectFilter(FilterType.ACTIVE);
        break;

      case FilterType.COMPLETED:
        onSelectFilter(FilterType.COMPLETED);
        break;

      default:
        onSelectFilter(FilterType.ALL);
        break;
    }
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter}
            onChange={handleFilterSelection}
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
          value={query}
          onChange={(event) => onChangeQuery(event.target.value)}
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
              value={query}
              onClick={() => onChangeQuery('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
