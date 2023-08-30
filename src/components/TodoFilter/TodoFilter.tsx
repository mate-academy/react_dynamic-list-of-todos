import { FILTER } from '../../types/FILTER';

interface Props {
  filterQuery: FILTER;
  setFilterQuery: React.Dispatch<React.SetStateAction<FILTER>>;
  queryInput: string;
  setQueryInput: React.Dispatch<React.SetStateAction<string>>
}

export const TodoFilter: React.FC<Props>
= ({
  filterQuery,
  setFilterQuery,
  queryInput,
  setQueryInput,
}) => {
  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterQuery(event.target.value as FILTER);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQueryInput(event.target.value);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterQuery}
            onChange={handleSelect}
          >
            <option value={FILTER.ALL}>All</option>
            <option value={FILTER.ACTIVE}>Active</option>
            <option value={FILTER.COMPLETED}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={queryInput}
          onChange={handleInputChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {queryInput.length !== 0 && (
            /* eslint-disable-next-line jsx-a11y/control-has-associated-label */
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setQueryInput('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
