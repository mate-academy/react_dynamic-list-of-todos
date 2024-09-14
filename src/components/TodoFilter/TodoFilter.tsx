import { FILTER } from '../../App';

type Props = {
  setSelectedFilter: React.Dispatch<React.SetStateAction<string>>;
  selectedFilter: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  query: string;
};

export const TodoFilter: React.FC<Props> = ({
  setSelectedFilter,
  selectedFilter,
  setQuery,
  query,
}) => {
  const handleClickDelete = () => {
    setQuery('');
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectedFilter}
            onChange={event => setSelectedFilter(event.target.value)}
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
          value={query}
          onChange={handleQueryChange}
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
              onClick={handleClickDelete}
            />
          </span>
        )}
      </p>
    </form>
  );
};
