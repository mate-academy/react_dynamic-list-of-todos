import { ChangeEvent } from 'react';
import { FilterType } from '../../types/FilterType';

type Props = {
  onFilterChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  query: string;
  onQueryChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onQueryReset: () => void;
};

export const TodoFilter: React.FC<Props> = ({
  onFilterChange,
  query,
  onQueryChange,
  onQueryReset,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={onFilterChange}
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
          onChange={onQueryChange}
          value={query}
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
              onClick={onQueryReset}
            />
          </span>
        )}
      </p>
    </form>
  );
};
