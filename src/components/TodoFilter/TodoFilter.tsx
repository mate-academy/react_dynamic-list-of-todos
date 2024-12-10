import { Completed, Filters } from '../../types/Filters';

interface Props {
  filterOptions: Filters;
  onFilterChange: (key: keyof Filters, value: string | Completed) => void;
}

export const TodoFilter: React.FC<Props> = ({
  filterOptions,
  onFilterChange,
}) => {
  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value as Completed;
    onFilterChange('completedType', selectedValue);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    onFilterChange('searchByText', query);
  };

  const clearSearch = () => {
    onFilterChange('searchByText', '');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterOptions.completedType}
            onChange={handleStatusChange}
          >
            <option value={Completed.All}>All</option>
            <option value={Completed.Active}>Active</option>
            <option value={Completed.Completed}>Completed</option>
          </select>
        </span>
      </p>
      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={filterOptions.searchByText}
          onChange={handleSearchChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>
        {filterOptions.searchByText && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={clearSearch}
            />
          </span>
       )}
       </p>
     </form>
   );
 };
