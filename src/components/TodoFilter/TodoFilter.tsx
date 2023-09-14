import { CompletionFilter } from '../../types/CompletionFilter';

type Props = {
  searchQuery: string,
  changeSearchQuery: (value: string) => void,
  completionStatus: CompletionFilter,
  changeCompletionStatus: (value: CompletionFilter) => void,
};

export const TodoFilter: React.FC<Props> = ({
  searchQuery,
  changeSearchQuery,
  completionStatus,
  changeCompletionStatus,
}) => {
  const handleCompletionStatusChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    switch (event.target.value) {
      case CompletionFilter.Completed:
        changeCompletionStatus(CompletionFilter.Completed);
        break;

      case CompletionFilter.Active:
        changeCompletionStatus(CompletionFilter.Active);
        break;

      default:
        changeCompletionStatus(CompletionFilter.All);
    }
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            value={completionStatus}
            data-cy="statusSelect"
            onChange={handleCompletionStatusChange}
          >
            <option value={CompletionFilter.All}>All</option>
            <option value={CompletionFilter.Active}>Active</option>
            <option value={CompletionFilter.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={searchQuery}
          onChange={(event) => changeSearchQuery(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {searchQuery && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => changeSearchQuery('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
