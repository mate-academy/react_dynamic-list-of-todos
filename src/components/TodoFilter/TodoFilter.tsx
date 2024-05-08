import { SortField } from '../../types/filter';

type Props = {
  sortField: SortField;
  setSortField: (field: SortField) => void;
  query: string;
  setQuery: (str: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  sortField,
  setSortField,
  setQuery,
  query,
}) => {
  const onCategorySelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = event.target.value as SortField;

    setSortField(selectedCategory);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={sortField}
            onChange={onCategorySelect}
          >
            <option value={SortField.All}>All</option>
            <option value={SortField.Active}>Active</option>
            <option value={SortField.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          value={query}
          onChange={event => setQuery(event.target.value)}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
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
