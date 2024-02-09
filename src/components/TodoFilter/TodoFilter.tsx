import { memo } from 'react';
import { FilterByCompleted } from '../../types/FilterByCompleted';

type Props = {
  titleFilter: string,
  onTitleFilterChange: (newTitle: string) => void,
  completedFilter: FilterByCompleted,
  onCompletedFilterChange: (newValue: FilterByCompleted) => void;
};

export const TodoFilter: React.FC<Props> = memo(({
  titleFilter,
  onTitleFilterChange,
  completedFilter,
  onCompletedFilterChange,
}) => (
  <form className="field has-addons" onSubmit={e => e.preventDefault()}>
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={completedFilter}
          onChange={
            e => onCompletedFilterChange(e.target.value as FilterByCompleted)
          }
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
        value={titleFilter}
        onChange={(e) => onTitleFilterChange(e.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {titleFilter.trim()
          && (
            /* eslint-disable-next-line jsx-a11y/control-has-associated-label */
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => onTitleFilterChange('')}
            />
          )}
      </span>
    </p>
  </form>
));
