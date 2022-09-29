import { FilterType } from '../../types/Filter';

interface Props {
  setFilterBy: (value: FilterType) => void;
  filterBy: FilterType,
  setQuery: (value: string) => void;
  query: string;
}
export const TodoFilter: React.FC<Props> = ({
  setFilterBy,
  filterBy,
  setQuery,
  query,
}) => {
  const handlerChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortType = event.target.value as FilterType;

    setFilterBy(newSortType);
  };

  const handlerChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => (
    setQuery(event.target.value));
  const handlerReset = () => setQuery('');

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterBy}
            onChange={handlerChangeSelect}
          >
            <option value={FilterType.ALL}>All</option>
            <option value={FilterType.ACTIVE}>Active</option>
            <option value={FilterType.COMPLETED}>Completed</option>
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
          onChange={handlerChangeInput}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query.length > 0
            && (
              <button
                data-cy="clearSearchButton"
                type="button"
                aria-label="delete"
                className="delete"
                onClick={handlerReset}
              />
            )}
        </span>
      </p>
    </form>
  );
};
