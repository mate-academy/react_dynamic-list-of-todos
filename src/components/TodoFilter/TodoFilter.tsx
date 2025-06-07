import { FilterParams, ParamsKeys } from '../../types/FilterParams';

type TodoFilterProps = {
  filterParam: ParamsKeys;
  setFilterParam: (value: ParamsKeys) => void;
  query: string;
  setQuery: (value: string) => void;
};

export const TodoFilter: React.FC<TodoFilterProps> = ({
  filterParam,
  setFilterParam,
  query,
  setQuery,
}) => {
  const handleSelectFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const param = event.target.value as ParamsKeys;

    setFilterParam(param);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterParam}
            onChange={handleSelectFilter}
          >
            {Object.entries(FilterParams).map(([key, value]) => {
              return (
                <option key={key} value={key}>
                  {value}
                </option>
              );
            })}
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
