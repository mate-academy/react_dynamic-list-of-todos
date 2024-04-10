import { FilteredOptions } from '../../types/FilteredOptions';

interface Props {
  query: string;
  setQuery: (query: string) => void;
  filteredField: FilteredOptions;
  setFilterField: (filteredField: FilteredOptions) => void;
}

export const TodoFilter: React.FC<Props> = ({
  query,
  setQuery,
  filteredField,
  setFilterField,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            value={filteredField}
            data-cy="statusSelect"
            onChange={event => {
              setFilterField(event.target.value as FilteredOptions);
            }}
          >
            {Object.values(FilteredOptions).map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
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
        {query && (
          <span className="icon is-right is-right--pointer">
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setQuery('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
