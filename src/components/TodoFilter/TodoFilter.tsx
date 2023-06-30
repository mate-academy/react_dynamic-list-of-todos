import { FilterBy } from '../../types/FilterBy';

type Props = {
  inputValue: string,
  selectedFilter: string,
  onChangeInput: (newValue: string) => void,
  onSelectStatus: (filter: FilterBy) => void
};

export const TodoFilter: React.FC<Props> = ({
  inputValue,
  selectedFilter,
  onSelectStatus,
  onChangeInput,
}) => {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeInput(event.target.value);
  };

  const handleClearButton = () => {
    onChangeInput('');
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelectStatus(event.target.value as FilterBy);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectedFilter}
            onChange={handleSelect}
          >
            {Object.values(FilterBy).map((filter) => (
              <option key={filter} value={filter}>
                {filter}
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
          value={inputValue}
          onChange={handleSearch}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          <button
            data-cy="clearSearchButton"
            type="button"
            aria-label="clear"
            className="delete"
            onClick={handleClearButton}
          />
        </span>
      </p>
    </form>
  );
};
