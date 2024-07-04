import { FC } from 'react';
import { Filters, FiltersInput, Completed } from '../../types/Completed';

interface TodoFilterProps {
  onFilter: FiltersInput;
  filters: Filters;
}

export const TodoFilter: FC<TodoFilterProps> = ({ onFilter, filters }) => {
  const options = [Completed.All, Completed.Completed, Completed.Active];

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filters.completed}
            onChange={e => onFilter('completed', e.target.value)}
          >
            {options.map(option => (
              <option value={option} key={option}>
                {option}
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
          value={filters.search}
          onChange={e => onFilter('search', e.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>
        {filters.search && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => onFilter('search', '')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
