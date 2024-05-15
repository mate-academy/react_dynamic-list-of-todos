import { FilteredOptions } from '../../types/FilteredOption';

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
            <option value="all">{FilteredOptions.all}</option>
            <option value="active">{FilteredOptions.active}</option>
            <option value="completed">{FilteredOptions.completed}</option>
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
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
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
