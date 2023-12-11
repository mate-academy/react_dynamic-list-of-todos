import { Filter } from '../../types/Filters';

type Props = {
  query: string;
  onChangeQuery: (newQuery: string) => void;
  onChangeFilter: (filterBy: Filter) => void,
};

export const TodoFilter: React.FC<Props> = ({
  query,
  onChangeQuery,
  onChangeFilter,
}) => {

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChangeFilter(event.target.value as Filter);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeQuery(event.target.value);
  };

  const resetQuery = () => {
    onChangeQuery('');
  };
  
  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleFilterChange}
          >
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
          className="input"
          placeholder="Search..."
          value={query}
          onChange={handleQueryChange}
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
              onClick={resetQuery}
            />
          </span>
        )}
      </p>
    </form>
  );
};
