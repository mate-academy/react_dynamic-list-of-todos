import { Filter } from '../../types/Filter';

type Props = {
  selectedFilter: string,
  setSelectedFilter: React.Dispatch<React.SetStateAction<Filter>>,
  query: string,
  setQuery: (searchText: string) => void,
};

export const TodoFilter: React.FC<Props> = ({
  selectedFilter,
  setSelectedFilter,
  query,
  setQuery,
}) => {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(event.target.value as Filter);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleInputReset = () => {
    setQuery('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectedFilter}
            onChange={handleSelectChange}
          >
            <option value={Filter.all}>All</option>
            <option value={Filter.active}>Active</option>
            <option value={Filter.completed}>Completed</option>
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
            // eslint-disable-next-line jsx-a11y/control-has-associated-label
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleInputReset}
            />
          )}
        </span>
      </p>
    </form>
  );
};
