import { SortField } from '../../types/SortField';

interface Props {
  sortField: SortField;
  setSortField: (sortField: SortField) => void;
  query: string;
  setQuery: (query: string) => void;
}

export const TodoFilter: React.FC<Props> = ({
  sortField,
  setSortField,
  query,
  setQuery,
}) => {
  const handleSortFieldChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const selectedValue = event.target.value;

    setSortField(selectedValue as SortField);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={sortField}
            onChange={handleSortFieldChange}
          >
            <option value={SortField.All}>All</option>
            <option value={SortField.Active}>Active</option>
            <option value={SortField.Completed}>Completed</option>
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
          onChange={event => setQuery(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setQuery('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
