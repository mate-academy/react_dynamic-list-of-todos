import { ChangeEvent, MouseEvent } from 'react';
import { FilterBy } from '../../types/FilterBy';

type Props = {
  query: string;
  filterBy: FilterBy;
  onQueryChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onFilterByChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  onQueryClear: (event: MouseEvent<HTMLButtonElement>) => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  filterBy,
  onQueryChange,
  onFilterByChange,
  onQueryClear,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterBy}
            onChange={onFilterByChange}
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
          onChange={onQueryChange}
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
              onClick={onQueryClear}
            />
          </span>
        )}
      </p>
    </form>
  );
};
