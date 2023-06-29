import { ChangeEvent, FC } from 'react';

interface Props {
  query: string,
  filterStatus: string,
  setQuery: React.Dispatch<React.SetStateAction<string>>,
  setFilterStatus: React.Dispatch<React.SetStateAction<string>>,
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
    setQuery(event.target.value);
  };

  const handleFilterMode = (event:ChangeEvent<HTMLSelectElement>) => {
    setFilterStatus(event.target.value);
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
          value={query}
          onChange={handleQueryChange}
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
              onClick={resetQuery}
            />
          </span>
        )}
      </p>
    </form>
  );
};
