import { ChangeEvent, FC } from 'react';
import { TodoFilterMode } from '../../Enums';

interface Props {
  query: string,
  filterStatus: string,
  setQuery: React.Dispatch<React.SetStateAction<string>>,
  setFilterStatus: React.Dispatch<React.SetStateAction<TodoFilterMode>>,
}

export const TodoFilter:FC<Props> = ({
  query,
  setQuery,
  filterStatus,
  setFilterStatus,
}) => {
  const resetQuery = () => setQuery('');

  const handleQueryChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    event.preventDefault();
    setQuery(event.target.value);
  };

  const handleFilterMode = (event:ChangeEvent<HTMLSelectElement>) => {
    setFilterStatus(event.target.value as TodoFilterMode);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterStatus}
            onChange={handleFilterMode}
          >
            {Object.entries(TodoFilterMode).map(([key, value]) => (
              <option key={key} value={value}>
                {value[0].toUpperCase() + value.slice(1)}
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
              aria-label="clear search button"
              className="delete"
              onClick={resetQuery}
            />
          </span>
        )}
      </p>
    </form>
  );
};
