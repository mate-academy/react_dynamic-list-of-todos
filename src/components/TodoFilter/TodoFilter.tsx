import { FilterProperties } from '../../App';

type Props = {
  filterProperties: FilterProperties;
  onFilterChange: (callback: (x: FilterProperties) => FilterProperties) => void;
};

export const TodoFilter = ({ filterProperties, onFilterChange }: Props) => {
  const { filterValue, filterType } = filterProperties;

  const handleChangeFilterQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    onFilterChange(prev => ({ ...prev, filterValue: value }));
  };

  const handleChangeFilterType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    if (value === 'all' || value === 'active' || value === 'completed') {
      onFilterChange(prev => ({ ...prev, filterType: value }));
    }
  };

  const handleClickClearQuery = () => {
    onFilterChange(prev => ({ ...prev, filterValue: '' }));
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterType}
            onChange={handleChangeFilterType}
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
          value={filterValue}
          onChange={handleChangeFilterQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {filterValue && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClickClearQuery}
            />
          </span>
        )}
      </p>
    </form>
  );
};
