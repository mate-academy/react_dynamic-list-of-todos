import { FilterBy } from '../../types/FilterBy';

type Props = {
  query: string,
  onSetQuery: (input: string) => void,
  onChangeFilter: (value: FilterBy) => void
};

export const TodoFilter: React.FC<Props> = (
  {
    query,
    onSetQuery,
    onChangeFilter,
  },
) => {
  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    switch (event.target.value) {
      case FilterBy.All:
        onChangeFilter(FilterBy.All);
        break;

      case FilterBy.Active:
        onChangeFilter(FilterBy.Active);
        break;

      case FilterBy.Completed:
        onChangeFilter(FilterBy.Completed);
        break;

      default:
        break;
    }
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSetQuery(event.target.value);
  };

  const handleClearQuery = () => {
    onSetQuery('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleSelect}
          >
            {Object.values(FilterBy).map(current => (
              <option value={current}>
                {`${current[0].toUpperCase() + current.slice(1)}`}
              </option>
            ))}
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
          onChange={handleQueryChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span
            className="icon is-right"
            style={{ pointerEvents: 'all' }}
          >
            <button
              data-cy="clearSearchButton"
              aria-label="clear"
              type="button"
              className="delete"
              onClick={handleClearQuery}
            />
          </span>
        )}
      </p>
    </form>
  );
};
