import { ChangeEvent } from 'react';
import { FilterType } from '../../types/FilterType';

type Props = {
  selectStatus: FilterType,
  query: string,
  setSelectStatus: (value: FilterType) => void;
  setQuery: (value: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  selectStatus,
  query,
  setSelectStatus,
  setQuery,
}) => {
  const handleQueryReset = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.currentTarget.value);
  };

  const handleSelectStatus = (event: ChangeEvent<HTMLSelectElement>) => {
    const newFilterType = event.currentTarget.value as FilterType;

    setSelectStatus(newFilterType);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectStatus}
            onChange={handleSelectStatus}
          >
            <option value={FilterType.All}>All</option>
            <option value={FilterType.Active}>Active</option>
            <option value={FilterType.Completed}>Completed</option>
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
          onChange={handleQueryReset}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query && (
            <button
              aria-label="All"
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setQuery('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
