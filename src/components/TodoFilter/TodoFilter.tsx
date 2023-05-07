import { GroupBy } from '../../types/GroupBy';

type Props = {
  filterBy: string,
  setFilterBy: (value: GroupBy) => void;
  query: string;
  setQuery: (value: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  filterBy,
  setFilterBy,
  query,
  setQuery,
}) => {
  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newGroupBy = event.target.value as GroupBy;

    setFilterBy(newGroupBy);
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleReset = () => setQuery('');

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterBy}
            onChange={handleSelect}
          >
            <option value={GroupBy.ALL}>All</option>
            <option value={GroupBy.ACTIVE}>Active</option>
            <option value={GroupBy.COMPLETED}>Completed</option>
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
          onChange={handleInput}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span
          className="icon is-right"
          style={{ pointerEvents: 'all' }}
        >
          {query && (
            <>
              <button
                aria-label="reset"
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={handleReset}
              />
            </>
          )}
        </span>
      </p>
    </form>
  );
};
