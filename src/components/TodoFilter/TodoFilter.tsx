import { Filter } from '../../enums/Filter';

type Props = {
  filterValue: string,
  query: string,
  onSetQuery: (value: string) => void,
  onSelectFilter: (value: Filter) => void,
  onApplyQuery: (value: string) => void,
};

export const TodoFilter: React.FC<Props> = ({
  filterValue,
  query,
  onSetQuery,
  onSelectFilter,
  onApplyQuery,
}) => {
  const handleSelectChange = (e: React.BaseSyntheticEvent) => {
    onSelectFilter(e.target.value);
  };

  const handleInputChange = (e: React.BaseSyntheticEvent) => {
    onSetQuery(e.target.value);
    onApplyQuery(e.target.value);
  };

  const reset = () => {
    onSetQuery('');
    onApplyQuery('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterValue}
            onChange={handleSelectChange}
          >
            <option value={Filter.All}>All</option>
            <option value={Filter.Active}>Active</option>
            <option value={Filter.Completed}>Completed</option>
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
          onChange={handleInputChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query && (
            <button
              data-cy="clearSearchButton"
              aria-label="null"
              type="button"
              className="delete"
              onClick={reset}
            />
          )}
        </span>
      </p>
    </form>
  );
};
