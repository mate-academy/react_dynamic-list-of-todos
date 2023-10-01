import { FilterOptions } from '../../types/Todo';

type Props = {
  query: string;
  setQuery: (str: string) => void;
  selectedOption: FilterOptions;
  setSelectedOption: (str: FilterOptions) => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  setQuery,
  selectedOption,
  setSelectedOption,
}) => {
  const resetButton = () => {
    setQuery('');
    setSelectedOption(FilterOptions.All);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectedOption}
            onChange={(event) => (
              setSelectedOption(event.target.value as FilterOptions)
            )}
          >
            {Object.entries(FilterOptions).map(([key, value]) => (
              <option
                key={key}
                value={value}
              >
                {key}
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
          onChange={(event) => setQuery(event.target.value)}
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
              onClick={resetButton}
            />
          </span>
        )}
      </p>
    </form>
  );
};
