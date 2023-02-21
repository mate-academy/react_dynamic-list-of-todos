import { FilterBy } from '../../types/FilterBy';

interface Props {
  onSearchInput : (input: string) => void
  onSelectValue : (input: FilterBy) => void
  todoSearchValue: string
  filterBy: FilterBy
}

export const TodoFilter: React.FC<Props> = ({
  onSearchInput,
  onSelectValue,
  todoSearchValue,
  filterBy,
}) => {
  const { active, all, completed } = FilterBy;

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterBy}
            onChange={(e) => {
              onSelectValue(e.target.value as FilterBy);
            }}
          >
            <option value={all}>All</option>
            <option value={active}>Active</option>
            <option value={completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={todoSearchValue}
          onChange={(e) => {
            onSearchInput(e.target.value);
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {todoSearchValue && (
            // eslint-disable-next-line jsx-a11y/control-has-associated-label
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => {
                onSearchInput('');
              }}
            />
          )}
        </span>
      </p>
    </form>
  );
};
