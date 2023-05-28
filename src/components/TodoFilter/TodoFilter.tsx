import { FilterType } from '../../types/FilterType';

interface Props {
  filterType: string;
  setFilterType: React.Dispatch<React.SetStateAction<string>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

export const TodoFilter: React.FC<Props> = ({
  filterType,
  setFilterType,
  searchQuery,
  setSearchQuery,
}) => {
  const handleSelectFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { target: { value } } = event;

    setFilterType(value);
  };

  const handleSearchByQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { value } } = event;
    const lowerCasedQuery = value.toLocaleLowerCase();

    setSearchQuery(lowerCasedQuery);
  };

  const handleClearSearchInput = () => setSearchQuery('');

  const isResetButtonVisible = searchQuery !== '';

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterType}
            onChange={handleSelectFilter}
          >
            {Object.entries(FilterType)
              .map((key) => {
                return (
                  <option
                    key={key[0]}
                    value={key[1]}
                  >
                    {key[0]}
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
          value={searchQuery}
          onChange={handleSearchByQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>

          {isResetButtonVisible && (
            /* eslint-disable-next-line jsx-a11y/control-has-associated-label */
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClearSearchInput}
            />
          )}

        </span>
      </p>
    </form>
  );
};
