import classNames from 'classnames';
import { FieldFilter } from '../../types/FieldFilter';

type Props = {
  onFilterByQuery: (event: string) => void;
  onFilterBy: (event: FieldFilter) => void;
  query: string;
};

export const TodoFilter: React.FC<Props> = ({
  onFilterByQuery,
  onFilterBy,
  query,
}) => {
  const handleFilterTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const selectedFilter = event.target.value as FieldFilter;

    onFilterBy(selectedFilter);
  };

  const handleSearchTodos = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFilterByQuery(event.target.value);
  };

  const filterOptions = Object.values(FieldFilter);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleFilterTypeChange}>
            {filterOptions.map(filter => (
              <option value={filter} key={filter}>
                {filter[0].toUpperCase() + filter.slice(1)}
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
          onChange={handleSearchTodos}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className={classNames('icon is-right', { pointerEvents: 'all' })}>
          {query && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => {
                onFilterByQuery('');
              }}
            />
          )}
        </span>
      </p>
    </form>
  );
};
