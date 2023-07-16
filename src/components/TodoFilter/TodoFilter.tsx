import { FilterType } from '../../types/FilterType';

type Props = {
  query: string
  setQuery: (qwery: string) => void
  selectedFilter: FilterType
  setSelectedFilter: (selectedFilter: FilterType) => void
};

export const TodoFilter: React.FC<Props> = (
  {
    query,
    setQuery,
    setSelectedFilter,
    selectedFilter,
  },
) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSelectedChange = (event: { target: { value: string } }) => {
    setSelectedFilter(event.target.value as FilterType);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectedFilter}
            onChange={(e) => handleSelectedChange(e)}
          >
            <option value={FilterType.ALL}>All</option>
            <option value={FilterType.ACTIVE}>Active</option>
            <option value={FilterType.COMPLETED}>Completed</option>
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

        {
          query && (
            <span className="icon is-right" style={{ pointerEvents: 'all' }}>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={() => setQuery('')}
              />
            </span>
          )

        }
      </p>
    </form>
  );
};
