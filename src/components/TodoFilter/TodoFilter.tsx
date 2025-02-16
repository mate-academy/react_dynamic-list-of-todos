import { Completed, Filters, FiltersInput } from '../../types/filters';
import { FC } from 'react';
interface Props {
  onFilter: FiltersInput;
  filters: Filters;
}

export const TodoFilter: FC<Props> = ({ onFilter, filters }) => {
  const options = [Completed.All, Completed.Active, Completed.Completed];

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            value={filters.completed}
            data-cy="statusSelect"
            onChange={e => onFilter('completed', e.target.value)}
          >
            {options.map(option => (
              <option value={option} key={option}>
                {option[0].toUpperCase() + option.slice(1, option.length)}
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
