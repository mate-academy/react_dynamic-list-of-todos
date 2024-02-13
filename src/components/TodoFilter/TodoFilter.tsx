import { FilterBy } from '../../enums/FilterBy';

interface Props {
  setFilterOptionValue: (param: FilterBy) => void,
  filterInputValue: string,
  setFilterInputValue: (param: string) => void,
}

export const TodoFilter: React.FC<Props> = ({
  setFilterOptionValue,
  filterInputValue,
  setFilterInputValue,
}) => {
  const { All, Completed, Active } = FilterBy;

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={
              event => setFilterOptionValue(event.target.value as FilterBy)
            }
          >
            <option value={All}>All</option>
            <option value={Active}>Active</option>
            <option value={Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={filterInputValue}
          onChange={event => setFilterInputValue(event.currentTarget.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {!!filterInputValue && (
            // eslint-disable-next-line jsx-a11y/control-has-associated-label
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setFilterInputValue('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
