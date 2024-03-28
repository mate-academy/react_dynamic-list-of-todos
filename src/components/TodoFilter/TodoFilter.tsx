import { FilteredOptions } from '../../types/FilteredOption';
import './TodoFilter';

type Props = {
  query: string;
  setQuery: (query: string) => void;
  selectedOption: string;
  handleSetOption: (option: FilteredOptions) => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  setQuery,
  selectedOption,
  handleSetOption,
}) => {
  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    handleSetOption(event.target.value as FilteredOptions);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectedOption}
            onChange={handleOptionChange}
          >
            <option value={FilteredOptions.All}>All</option>
            <option value={FilteredOptions.Active}>Active</option>
            <option value={FilteredOptions.Completed}>Completed</option>
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

        {query && (
          <span className="icon is-right all-pointer-events">
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
