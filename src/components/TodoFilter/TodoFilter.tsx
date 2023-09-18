import { FilterBy } from '../Enums/FilterBy';

type TodoFilterProps = {
  selectedStatus: FilterBy;
  onFilterChange: (status: FilterBy) => void;
  onTextChange: (text: string) => void;
  filterText: string;
};

export const TodoFilter: React.FC<TodoFilterProps> = ({
  selectedStatus,
  onFilterChange,
  onTextChange,
  filterText,
}) => {
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value as FilterBy;

    onFilterChange(selectedValue);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onTextChange(e.target.value);
  };

  const handleClearInput = () => {
    onTextChange('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectedStatus}
            onChange={handleStatusChange}
          >
            <option value={FilterBy.ALL}>All</option>
            <option value={FilterBy.ACTIVE}>Active</option>
            <option value={FilterBy.COMPLETED}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={filterText}
          onChange={handleTextChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {filterText !== '' && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClearInput}
            />
          </span>
        )}
      </p>
    </form>
  );
};
