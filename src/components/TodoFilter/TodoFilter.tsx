import { FilterTodos } from '../../types/FilterTodos';

type Props = {
  query: string,
  onQueryChange: (val: string) => void,
  selectedFilter: string,
  onSelectedFilter: (val: FilterTodos) => void,
};

export const TodoFilter: React.FC<Props> = ({
  query,
  onQueryChange,
  selectedFilter,
  onSelectedFilter,
}) => {
  const resetAllFilters = () => {
    onQueryChange('');
    onSelectedFilter(FilterTodos.All);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectedFilter}
            onChange={(event) => {
              onSelectedFilter(event?.target.value as FilterTodos);
            }}
          >
            {(Object.values(FilterTodos))
              .map((value) => (
                <option
                  value={value}
                  key={value}
                >
                  {value}
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
          onChange={(event) => onQueryChange(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>
        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={resetAllFilters}
            />
          </span>
        )}
      </p>
    </form>
  );
};
