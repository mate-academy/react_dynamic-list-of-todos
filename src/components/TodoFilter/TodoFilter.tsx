import { FilterStatusType } from '../../types/Todo';

type Props = {
  setQuery: (letter: string) => void;
  setFilterStatus: (status: FilterStatusType) => void;
  query: string;
};

export const TodoFilter: React.FC<Props> = ({
  setQuery,
  setFilterStatus,
  query,
}) => {
  const handleChangeFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSelectFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterStatus(event.target.value as FilterStatusType);
  };

  const handlClearButton = () => {
    setQuery('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleSelectFilter}>
            <option value={FilterStatusType.All}>All</option>
            <option value={FilterStatusType.Active}>Active</option>
            <option value={FilterStatusType.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          onChange={handleChangeFilter}
          value={query}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right is-clickable">
          {query && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handlClearButton}
            />
          )}
        </span>
      </p>
    </form>
  );
};
