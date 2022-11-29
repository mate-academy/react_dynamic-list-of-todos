import {
  ChangeEvent,
  FC,
  FormEvent,
  memo,
  useCallback,
} from 'react';

interface TodoFilterProps {
  valueSelection: string;
  setValueSelection: (change: string) => void;
  searchResult: string;
  setSearchResult: (change: string) => void;
}

export const TodoFilter: FC<TodoFilterProps> = memo(
  ({
    valueSelection,
    setValueSelection,
    searchResult,
    setSearchResult,
  }) => {
    const handleSelection = useCallback(
      (event: ChangeEvent<HTMLSelectElement>) => {
        setValueSelection(event.target.value);
      },
      [valueSelection],
    );

    const handleSearching = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        setSearchResult(event.target.value);
      },
      [searchResult],
    );

    const emptySearch = useCallback(() => {
      setSearchResult('');
    },
    []);

    const handleFormSubmit = useCallback((event: FormEvent) => {
      event.preventDefault();
    },
    []);

    return (
      <form className="field has-addons" onSubmit={handleFormSubmit}>
        <p className="control">
          <span className="select">
            <select
              data-cy="statusSelect"
              value={valueSelection}
              onChange={handleSelection}
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </span>
        </p>

        <p className="control is-expanded has-icons-left has-icons-right">
          <input
            data-cy="searchInput"
            type="text"
            className="input"
            placeholder="Search..."
            value={searchResult}
            onChange={handleSearching}
          />
          <span className="icon is-left">
            <i className="fas fa-magnifying-glass" />
          </span>

          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {searchResult && (
              // eslint-disable-next-line jsx-a11y/control-has-associated-label
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={emptySearch}
              />
            )}
          </span>
        </p>
      </form>
    );
  },
);
