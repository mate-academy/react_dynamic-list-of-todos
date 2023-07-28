import { ChangeEvent } from 'react';
import { FilterSelect } from '../../types/FilterSelect';

interface Props {
  filter: string;
  setFilter: (filter: string) => void;
  filterSelect: FilterSelect;
  setFilterSelect: (filter: FilterSelect) => void;
}

export const TodoFilter: React.FC<Props> = ({
  filter,
  setFilter,
  filterSelect,
  setFilterSelect,
}) => {
  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setFilterSelect(event.target.value as FilterSelect);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterSelect}
            onChange={handleSelect}
          >
            <option value={FilterSelect.All}>All</option>
            <option value={FilterSelect.Active}>Active</option>
            <option value={FilterSelect.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={filter}
          onChange={handleInput}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {filter && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              aria-label="Clear Search"
              onClick={() => setFilter('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
