import { FilterTypes } from '../../types/FilterTypes';

type Props = {
  onFilterChange: (type: FilterTypes) => void;
  query: string;
  onQueryChange: (value: string) => void;
  filter: FilterTypes;
};

export const TodoFilter: React.FC<Props> = ({
  onFilterChange,
  query,
  onQueryChange,
  filter,
}) => {
  const handleFilterChange = (type: FilterTypes) => {
    onFilterChange(type);
  };

  const handleQueryChange = (value: string) => {
    onQueryChange(value);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter}
            onChange={event =>
              handleFilterChange(event.target.value as FilterTypes)
            }
          >
            <option value="All">{FilterTypes.All}</option>
            <option value="Active">{FilterTypes.Active}</option>
            <option value="Completed">{FilterTypes.Completed}</option>
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
          onChange={event => handleQueryChange(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query !== '' && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => handleQueryChange('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
