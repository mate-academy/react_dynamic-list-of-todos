import { FilterType } from '../../types/FilterTypes';

type Props = {
  query: string;
  changeQuery: (query:string) => void;
  filterType: FilterType;
  changeFilterType: (value:FilterType) => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  changeQuery,
  filterType,
  changeFilterType,
}) => {
  const handleReset = () => {
    changeFilterType(FilterType.All);
    changeQuery('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterType}
            // eslint-disable-next-line max-len
            onChange={event => changeFilterType(event.target.value as FilterType)}
          >
            <option value={FilterType.All}>All</option>
            <option value={FilterType.Active}>Active</option>
            <option value={FilterType.Completed}>Completed</option>
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
          onChange={(event) => changeQuery(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query && (
            // eslint-disable-next-line jsx-a11y/control-has-associated-label
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleReset}
            />
          )}

        </span>
      </p>
    </form>
  );
};
