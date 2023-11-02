import { FC } from 'react';
import { Filter } from '../../types/Filter';

type Props = {
  query: string;
  onQueryChange: (query: string) => void;
  filter: Filter;
  onFilterChange: (filter: Filter) => void;
};

export const TodoFilter: FC<Props> = ({
  query,
  onFilterChange,
  onQueryChange,
  filter,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={filter}
          onChange={(event) => onFilterChange(event.target.value as Filter)}
        >
          <option value={Filter.All}>All</option>
          <option value={Filter.Active}>Active</option>
          <option value={Filter.Completed}>Completed</option>
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
        onChange={(event) => onQueryChange(event.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {query && (
          /* eslint-disable-next-line jsx-a11y/control-has-associated-label */
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => {
              onQueryChange('');
            }}
          />
        )}
      </span>
    </p>
  </form>
);
