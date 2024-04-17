import { Filter } from '../../types/Filter';

type Props = {
  filter: Filter;
  setFilter: (prop: Filter) => void;
  query: string;
  setQuery: (prop: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  filter,
  setFilter,
  query,
  setQuery,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    switch (event.target.value) {
      case Filter.All:
        setFilter(Filter.All);
        break;

      case Filter.Active:
        setFilter(Filter.Active);
        break;

      case Filter.Completed:
        setFilter(Filter.Completed);
        break;

      default:
        break;
    }
  };

  return (
    <form
      onSubmit={event => event.preventDefault()}
      className="field has-addons"
    >
      <p className="control">
        <span className="select">
          <select value={filter} onChange={handleChange} data-cy="statusSelect">
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
          value={query}
          onChange={event => setQuery(event.target.value)}
          className="input"
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query.trim() && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              onClick={() => setQuery('')}
              data-cy="clearSearchButton"
              type="button"
              className="delete"
            />
          </span>
        )}
      </p>
    </form>
  );
};
