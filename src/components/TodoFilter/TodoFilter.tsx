import { OnQueryChange, OnOptionChange } from '../../types/functions';
import { FilterOption } from '../../types/variables';

type Props = {
  filterOption: FilterOption;
  filterQuery: string;
  onOptionChange: OnOptionChange;
  onQueryChange: OnQueryChange;
};

export const TodoFilter: React.FC<Props> = ({
  filterOption,
  filterQuery,
  onOptionChange,
  onQueryChange,
}) => {
  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onOptionChange(event.currentTarget.value as FilterOption);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.currentTarget.value);
  };

  const handleCancelClick = () => {
    onQueryChange('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterOption}
            onChange={handleOptionChange}
          >
            <option value={FilterOption.All}>All</option>
            <option value={FilterOption.Active}>Active</option>
            <option value={FilterOption.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={filterQuery}
          onChange={handleQueryChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {filterQuery && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleCancelClick}
            />
          </span>
        )}
      </p>
    </form>
  );
};
