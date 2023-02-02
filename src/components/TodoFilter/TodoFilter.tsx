import { FC } from 'react';
import { FilterType } from '../../types';

type Props = {
  query: string,
  setQuery: (query: string) => void,
  filterType: FilterType,
  setFilter: (filterType: FilterType) => void,
  clear: () => void,
};

export const TodoFilter: FC<Props> = ({
  query,
  filterType,
  setQuery,
  setFilter,
  clear,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={filterType}
          onChange={({ target }) => setFilter(target.value as FilterType)}
        >
          <option value={FilterType.ALL}>All</option>
          <option value={FilterType.ACTIVE}>Active</option>
          <option value={FilterType.COMPLETED}>Completed</option>
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
        onChange={({ target }) => setQuery(target.value)}
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
            onClick={clear}
          />
        </span>
      )}
    </p>
  </form>
);
