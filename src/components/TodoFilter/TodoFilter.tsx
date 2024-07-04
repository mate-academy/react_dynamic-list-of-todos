import { FC } from 'react';
import { Filters, FiltersInput, Select } from '../../types';

interface Props {
  onFilter: FiltersInput;
  filters: Filters;
}

export const TodoFilter: FC<Props> = ({ onFilter, filters }) => {
  const options = [Select.All, Select.Active, Select.Completed];

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            name="select"
            data-cy="statusSelect"
            value={filters.select}
            onChange={e => onFilter('select', e.target.value)}
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
          name="search"
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
