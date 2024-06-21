import { Filter } from '../../types/FIlter';

type Props = {
  filter: Filter;
  setFilter: (filter: Filter) => void;
  searchValue: string;
  setSearchValue: (value: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  filter,
  setFilter,
  searchValue,
  setSearchValue,
}) => {
  const filterOptions = [
    { value: Filter.ALL, label: 'All' },
    { value: Filter.ACTIVE, label: 'Active' },
    { value: Filter.COMPLETED, label: 'Completed' },
  ];

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter}
            onChange={e => setFilter(e.target.value as Filter)}
          >
            {filterOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
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
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
        />

        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {searchValue && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setSearchValue('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
