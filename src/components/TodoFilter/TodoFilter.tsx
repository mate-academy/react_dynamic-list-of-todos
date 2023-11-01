/* eslint-disable max-len */
import { FilterStatus } from '../../types/FilterStatus';

type Props = {
  query: string,
  setQuery: (value: string) => void,
  selectedStatus: string,
  setSelectedStatus: (value: FilterStatus) => void,
};

export const TodoFilter: React.FC<Props> = ({
  query,
  setQuery,
  selectedStatus,
  setSelectedStatus,
}) => {
  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSelectedStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(event.target.value as FilterStatus);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleSelectedStatus}
            value={selectedStatus}
          >
            {Object.values(FilterStatus).map((status, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <option value={status} key={index}>
                {status}
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
          onChange={handleQuery}
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
              onClick={() => setQuery('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
