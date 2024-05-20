import { FilterType } from '../../types/Filter';

type Props = {
  setFilter: React.Dispatch<React.SetStateAction<FilterType>>;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  query: string;
};

export const TodoFilter: React.FC<Props> = ({ setFilter, setQuery, query }) => {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    switch (event.target.value) {
      case FilterType.All:
        setFilter(FilterType.All);

        break;
      case FilterType.Active:
        setFilter(FilterType.Active);

        break;
      default:
        setFilter(FilterType.Completed);
    }
  };

  const handleClearQuery = () => {
    setQuery('');
  };

  const filterVar = [FilterType.All, FilterType.Active, FilterType.Completed];

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleSelectChange}>
            {filterVar.map(filterValue => (
              <option value={filterValue} key={filterValue}>
                {filterValue}
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
          onChange={event => setQuery(event.target.value)}
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
              onClick={handleClearQuery}
            />
          )}
        </span>
      </p>
    </form>
  );
};
