import { ChangeEvent } from 'react';
import { FilterBy } from '../../types/FilterBy';

type Props = {
  query: string,
  setQuery: (value: string) => void,
  filterBy: FilterBy;
  setFilterBy: (value: FilterBy) => void
};

export const TodoFilter: React.FC<Props> = ({
  query,
  setQuery,
  filterBy,
  setFilterBy,
}) => {
  const onHendleSetFilterType = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as FilterBy;

    setFilterBy(value);
  };

  return (
    <form
      className="field has-addons"
      onSubmit={(event => event.preventDefault())}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterBy}
            onChange={onHendleSetFilterType}
          >
            <option value={FilterBy.All}>All</option>
            <option value={FilterBy.Active}>Active</option>
            <option value={FilterBy.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          value={query}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          onChange={(event) => setQuery(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {!!query.length && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              aria-label="delete"
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
